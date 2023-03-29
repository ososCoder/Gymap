'use strict';

//Require query selectUserInfoByIdQuery
const selectUserInfoByIdQuery = require('../../bbdd/queries/users/selectUserInfoByIdQuery');

const getOwnUser = async (req, res, next) => {
  //Info del usuario
  try {
    //Obtención de la información del usuario.
    //A la query se pasa el path params
    const userInformation = await selectUserInfoByIdQuery(req.user.id);

    //Response
    res.status(200).send({
      status: 'ok',
      message: `Información del usuario logueado`,
      data: userInformation,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOwnUser;
