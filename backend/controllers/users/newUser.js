'use strict';

//Helpers
const { generateError, validateSchema } = require('../../helpers');

//Schema para validación de datos name, email, password
const newUserSchema = require('../../schemas/newUserSchema');

//insertNewUserQuery
const insertNewUserQuery = require('../../bbdd/queries/users/insertNewUserQuery');

//newUser controller
const newUser = async (req, res, next) => {
  try {
    //Validación con Joi de name, email & password
    await validateSchema(newUserSchema, req.body);

    //Obtener name, email & password del body
    const { name, email, password } = req.body;

    //Check de campos requeridos
    if (!name || !email || !password) {
      generateError('Faltan campos', 400);
    }

    //Si el check es correcto, query para insertar newUser en DB
    await insertNewUserQuery(name, email, password);

    //response
    res.send({
      status: 'ok',
      message: `Hola ${name}, tu usuario ha sido creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newUser;
