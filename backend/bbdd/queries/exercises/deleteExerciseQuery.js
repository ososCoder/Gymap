'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

//Query eliminación de LIKES
const deleteExerciseQuery = async (idExercise) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query DELETE
    await connection.query(
      `
        DELETE
        FROM exercises
        WHERE id = ?
    `,
      [idExercise]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteExerciseQuery;
