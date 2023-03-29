'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

//Query que devuelve el número total de favs de un ejercicio
const getTotalFavsQuery = async (id) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query
    const [totalFavs] = await connection.query(
      `
        SELECT COUNT(id) AS totalFavs FROM favourites WHERE exerciseId = ?
    `,
      [id]
    );

    //Return
    return totalFavs[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getTotalFavsQuery;
