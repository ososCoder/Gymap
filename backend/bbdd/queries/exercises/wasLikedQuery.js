'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

const wasLikedQuery = async (userId = '', id) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query
    let wasLikedDB = await connection.query(
      `
        SELECT id
        FROM likes
        WHERE userId = ? AND exerciseId = ?
    `,
      [userId, id]
    );

    //Check del resultado de la query
    if (wasLikedDB[0].length > 0) {
      wasLikedDB = true;
    } else {
      wasLikedDB = false;
    }

    return wasLikedDB;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = wasLikedQuery;
