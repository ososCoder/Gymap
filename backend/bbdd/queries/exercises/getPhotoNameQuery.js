'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

//Query para obtener el nombre de la photo del ejercicio a eliminar
const getPhotoNameQuery = async (idExercise) => {
  let connection;
  try {
    connection = await getConnectionDB();

    //Query a la DB
    const [photoNameDB] = await connection.query(
      `
        SELECT photo
        FROM exercises
        WHERE id = ?
    `,
      [idExercise]
    );

    //Return
    return photoNameDB[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getPhotoNameQuery;
