'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

//Query eliminación de LIKES
const deleteExerciseLikesQuery = async (idExercise) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query DELETE
    await connection.query(
      `
        DELETE
        FROM likes
        WHERE exerciseId = ?
    `,
      [idExercise]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteExerciseLikesQuery;
