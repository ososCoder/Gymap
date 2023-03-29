'use strict';

//Connection
const getConnectionDB = require('../../getConnectionDB');

//Helpers
const { generateError } = require('../../../helpers');

//deleteQuery
const deleteLikeQuery = async (idExercise, idUser) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query a la DB
    const [isLike] = await connection.query(
      `
        SELECT id
        FROM likes
        WHERE userId = ? AND exerciseId = ?
    `,
      [idUser, idExercise]
    );

    //Check del isLike
    if (isLike.length === 0) {
      generateError(
        'No has dado LIKE al ejercicio. No puedes quitar el LIKE',
        405
      );
    }

    const idLike = isLike[0].id;

    //DELETE del like
    await connection.query(`DELETE FROM likes WHERE id = ?`, [idLike]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteLikeQuery;
