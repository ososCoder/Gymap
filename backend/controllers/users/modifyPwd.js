'use strict';

//Query
const modifyPwdQuery = require('../../bbdd/queries/users/modifyPwdQuery');

//Helpers
const { generateError } = require('./../../helpers');

//Middleware modifyPwd
const modifyPwd = async (req, res, next) => {
  try {
    //Destructuring
    const { id } = req.params;
    const { id: userId } = req.user;

    //Check de identidad
    if (Number(id) !== userId) {
      generateError('Solo puedes editar tu contraseña', 401);
    }

    //Destructuring del cambio de contraseña
    const { actualPassword, newPassword } = req.body;
    console.log(actualPassword, newPassword);
    //Check de seguridad
    if (actualPassword === newPassword) {
      generateError(
        'Tu nueva contraseña no puede ser similar a la anterior',
        400
      );
    }

    //Query para insertar nueva contraseña en DB
    await modifyPwdQuery(userId, actualPassword, newPassword);

    //Response
    res.send({
      status: 'ok',
      message: 'Contraseña cambiada',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = modifyPwd;
