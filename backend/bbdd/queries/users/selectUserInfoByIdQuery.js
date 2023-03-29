'use strict';

//Conexión a la DB
const getConnection = require('../../getConnectionDB');

//Helper generate error
const { generateError } = require('../../../helpers');

//Query para importar información del usuario por Id a partir del path params
const selectUserInfoByIdQuery = async (idUser) => {
  let connection;

  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `SELECT id, name, email, avatar, role, createdAt FROM users WHERE id = ?`,
      [idUser]
    );

    //Si user está vacío se lanza un error
    if (user.length < 1) {
      generateError('Usuario no encontrado', 404);
    }

    //Return de la función con el usuario de la posición 0
    return user[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserInfoByIdQuery;
