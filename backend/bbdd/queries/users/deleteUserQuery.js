'use strict';

const getConnectionDB = require('./../../getConnectionDB');

const deleteUserQuery = async (id) => {
  let connection;
  try {
    connection = await getConnectionDB();
    //Borramos los favoritos del usuario
    await connection.query(
      `
        DELETE FROM favourites WHERE userId = ?
    `,
      [id]
    );
    //Borramos los likes del usuario
    await connection.query(
      `
        DELETE FROM likes WHERE userId = ?
    `,
      [id]
    );
    //Borramos el usuario
    await connection.query(
      `
        DELETE FROM users WHERE id = ?
    `,
      [id]
    );
  } finally {
    if (connection) connection.release;
  }
};
module.exports = deleteUserQuery;
