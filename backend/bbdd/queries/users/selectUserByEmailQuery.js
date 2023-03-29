'use strict';

//Conexión a la DB
const getConnection = require('../../getConnectionDB');

//Helper generateError
const { generateError } = require('../../../helpers');

const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `SELECT id, password, role FROM users WHERE email = ?`,
      [email]
    );

    //Si el array user está vacío se lanza un error
    if (user.length < 1) {
      generateError('El usuario no existe', 404);
    }

    //Retorno del usuario de la posición 0 del array user
    return user[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;
