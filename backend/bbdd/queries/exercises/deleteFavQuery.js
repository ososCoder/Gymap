'use strict';

//Connection
const getConnectionDB = require('../../getConnectionDB');

//Helpers
const { generateError } = require('../../../helpers');

//deleteQuery
const deleteFavQuery = async (idExercise, idUser) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query a la DB
    const [isFav] = await connection.query(
      `
        SELECT id
        FROM favourites
        WHERE userId = ? AND exerciseId = ?
    `,
      [idUser, idExercise]
    );

    //Check del isLike
    if (isFav.length === 0) {
      generateError('El ejercicio no está entre tus FAVORITOS', 405);
    }

    const idFav = isFav[0].id;

    //DELETE del like
    await connection.query(`DELETE FROM favourites WHERE id = ?`, [idFav]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteFavQuery;
