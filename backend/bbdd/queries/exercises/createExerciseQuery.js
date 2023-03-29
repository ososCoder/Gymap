'use strict';

//Conexión a la DB
const getConnection = require('../../getConnectionDB');

//Query createexerciseQuery.
//Se guarda en la base de datos toda la info de cada ejercicio + el nombre de la imagen obligatoria

const createExerciseQuery = async (reqBody, imgNameExercise, userId) => {
  let connection;

  try {
    connection = await getConnection();

    //Destucturing del reqBody
    const { name, description, typology, muscleGroup } = reqBody;

    //Query para grabar la info en la DB
    await connection.query(
      `
        INSERT INTO exercises (name, description, photo, typology, muscleGroup, userId)
        VALUES (?, ?, ?, ?, ?, ?)
    `,
      [name, description, imgNameExercise, typology, muscleGroup, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createExerciseQuery;
