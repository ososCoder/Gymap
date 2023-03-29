'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

const isFavQuery = async (userId = '', id) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query
    let isFavDB = await connection.query(
      `
        SELECT id
        FROM favourites
        WHERE userId = ? AND exerciseId = ?
    `,
      [userId, id]
    );

    //Check del resultado de la query
    if (isFavDB[0].length > 0) {
      isFavDB = true;
    } else {
      isFavDB = false;
    }

    return isFavDB;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = isFavQuery;
