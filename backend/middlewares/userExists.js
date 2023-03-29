'use strict';

//Generate error
const { generateError } = require('../helpers');

//Query
const checkUserExistsByIdQuery = require('../bbdd/queries/users/checkUserExistsByIdQuery');

//Middleware de control de usuario existente pasado por path params

const userExists = async (req, res, next) => {
  try {
    //Destructuring del path params
    const { id } = req.params;

    //Query para check de user id
    const user = await checkUserExistsByIdQuery(id);

    //Check de el array user
    if (user.length === 0) {
      generateError(`El usuario ${id} no existe`, 404);
    }

    //Next al siguiente controlador si user > 0 --> el usuario existe!
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userExists;
