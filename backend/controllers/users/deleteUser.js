'use strict';
const deleteUserQuery = require('../../bbdd/queries/users/deleteUserQuery');
//Generate error
const { generateError } = require('./../../helpers');
//Funcion delete user
const deleteUser = async (req, res, next) => {
  //Path params
  const { id } = req.params;

  try {
    if (req.user.role !== 'admin') {
      generateError('Solo un ADMIN puede borrar un usuario', 401);
    }
    if (id === '1') {
      generateError('No te puedes borrar a ti mismo, eres el ADMIN!!!', 401);
    }

    await deleteUserQuery(id);

    //Response
    res.status(200).send({
      status: 'ok',
      message: `Usuario ${id} borrado:`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUser;
