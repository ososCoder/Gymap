'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

//Query que devuelve el número total de likes de un ejercicio
const getTotalLikesQuery = async (id) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query
    const [totalLikes] = await connection.query(
      `
        SELECT COUNT(id) AS totalLikes FROM likes WHERE exerciseId = ?
    `,
      [id]
    );

    //Return
    return totalLikes[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getTotalLikesQuery;
