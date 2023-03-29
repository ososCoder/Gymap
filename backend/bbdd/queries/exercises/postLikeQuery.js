'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

//Helper
const { generateError } = require('../../../helpers');

//Query INSERT a la DB en tabla likes
const postLikeQuery = async (idExercise, idUser) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query que determina si el usuario ha votado ya ese ejercicio
    const [existingLike] = await connection.query(
      `
        SELECT id
        FROM likes
        WHERE userId = ? AND exerciseId = ?
    `,
      [idUser, idExercise]
    );

    //Check de existingLike
    if (existingLike.length > 0) {
      generateError(`Ya has dado LIKE al ejercicio ${idExercise}`, 403);
    }

    //INSERT de like en la tabla likes
    await connection.query(
      `
        INSERT INTO likes (userId, exerciseId)
        VALUES (?, ?)
    `,
      [idUser, idExercise]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = postLikeQuery;
