'use strict';

//Require query selectUserInfoByIdQuery
const selectUserInfoByIdQuery = require('../../bbdd/queries/users/selectUserInfoByIdQuery');

const infoUser = async (req, res, next) => {
  //Path params
  const { id } = req.params;

  //Info del usuario
  try {
    //Obtención de la información del usuario.
    //A la query se pasa el path params
    const userInformation = await selectUserInfoByIdQuery(id);

    //Objeto para el usuario "member"
    const info = {
      name: userInformation.name,
      avatar: userInformation.avatar,
    };

    //Objeto para el usuario "ADMIN" o "member" con igual id en TOKEN + path params
    //Check de la info del TOKEN
    if (Number(id) === req.user.id || req.user.role === 'admin') {
      (info.id = userInformation.id),
        (info.email = userInformation.email),
        (info.createdAt = userInformation.createdAt);
    }

    //Response
    res.status(200).send({
      status: 'ok',
      message: `Información disponible del usuario ${id}:`,
      data: info,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = infoUser;
