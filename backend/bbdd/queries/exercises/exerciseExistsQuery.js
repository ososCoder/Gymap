'use strict';

const { generateError } = require('../../../helpers');
//Conexión a la DB
const getConnectionDB = require('../../getConnectionDB');

//Query del id del ejercicio a la DB

const exerciseExistsQuery = async (idExercise) => {
  let connection;

  try {
    connection = await getConnectionDB();

    const [exercise] = await connection.query(
      `
        SELECT id
        FROM exercises
        WHERE id = ?
    `,
      [idExercise]
    );

    //Check de exercise
    if (exercise.length === 0) {
      generateError(`El ejercicio ${idExercise} no existe`, 404);
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = exerciseExistsQuery;
