'use strict';

//Connexión DB
const getConnectionDB = require('../../getConnectionDB');

//Query para extraer info del ejercicio de la DB

const infoExerciseQuery = async (idExercise) => {
  let connection;

  try {
    connection = await getConnectionDB();

    const [infoExercise] = await connection.query(
      `
        SELECT *
        FROM exercises
        WHERE id = ?
    `,
      [idExercise]
    );

    //Return al controlador modifyExercise para tener toda la info sobre el ejercicio solicitado
    return infoExercise[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = infoExerciseQuery;
