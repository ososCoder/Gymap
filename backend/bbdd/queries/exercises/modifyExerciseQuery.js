'use strict';

//Conexión DB
const getConnectionDB = require('../../getConnectionDB');

const modifyExerciseQuery = async (exerciseData) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Destructuring del argumento de la función (req.body)
    const {
      name,
      description,
      typology,
      muscleGroup,
      imgNameExercise,
      idExercise,
    } = exerciseData;

    //Query de UPDATE exercise
    await connection.query(
      `
        UPDATE exercises
        SET name = ?, description = ?, photo = ?, typology = ?, muscleGroup = ?
        WHERE id = ?
    `,
      [name, description, imgNameExercise, typology, muscleGroup, idExercise]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = modifyExerciseQuery;
