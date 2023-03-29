'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

//Query eliminación de LIKES
const deleteExerciseFavsQuery = async (idExercise) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query DELETE
    await connection.query(
      `
        DELETE
        FROM favourites
        WHERE exerciseId = ?
    `,
      [idExercise]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteExerciseFavsQuery;
