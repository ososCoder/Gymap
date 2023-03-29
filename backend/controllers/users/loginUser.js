'use strict';

//Helper generateError
const { generateError, validateSchema } = require('../../helpers');

//Query selectUserByEmailQuery
const selectUserByEmailQuery = require('../../bbdd/queries/users/selectUserByEmailQuery');

//Schema para validación de email y password
const loginUserSchema = require('../../schemas/loginUserSchema');

//Encriptado de contraseñas bcrypt
const bcrypt = require('bcrypt');

//JWT para generación del TOKEN
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
  try {
    //Validación de email & password con Joi
    await validateSchema(loginUserSchema, req.body);

    //Destructuring del body del request
    const { email, password } = req.body;

    //Check de campos requeridos
    if (!email) {
      generateError('No has escrito dirección email', 400);
    }

    if (!password) {
      generateError('No has escrito password ', 400);
    }

    //Query a la DB con el email del usuario
    const user = await selectUserByEmailQuery(email);
    console.log(user);

    //Check de contraseña correcta
    const validPass = await bcrypt.compare(password, user.password);

    //Error de contraseña no correcta
    if (!validPass) {
      generateError('Contraseña incorrecta', 401);
    }

    //Creación del TOKEN
    //Objeto con información a agregar al token
    const tokenInfo = {
      id: user.id,
      role: user.role,
    };

    //Creación del TOKEN
    const token = jwt.sign(tokenInfo, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });

    res.send({
      status: 'ok',
      data: {
        id: user.id,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
