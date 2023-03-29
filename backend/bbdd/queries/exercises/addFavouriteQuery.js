'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

//Helper
const { generateError } = require('../../../helpers');

//Query INSERT a la DB en tabla likes
const addFavouriteQuery = async (idExercise, idUser) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query que determina si el usuario ha votado ya ese ejercicio
    const [existingFav] = await connection.query(
      `
        SELECT id
        FROM favourites
        WHERE userId = ? AND exerciseId = ?
    `,
      [idUser, idExercise]
    );

    //Check de existingLike
    if (existingFav.length > 0) {
      generateError(
        `Ya has añadido el ejercicio ${idExercise} a tus FAVORITOS`,
        403
      );
    }

    //INSERT de like en la tabla likes
    await connection.query(
      `
        INSERT INTO favourites (userId, exerciseId)
        VALUES (?, ?)
    `,
      [idUser, idExercise]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addFavouriteQuery;
