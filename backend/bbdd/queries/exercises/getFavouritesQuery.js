'use strict';
const { generateError } = require('../../../helpers');
//Get connection
const getConnectionDB = require('./../../getConnectionDB');
const getTotalFavsQuery = require('./getTotalFavsQuery');
const getTotalLikesQuery = require('./getTotalLikesQuery');
const isFavQuery = require('./isFavQuery');
const wasLikedQuery = require('./wasLikedQuery');
//Funcion getFavouritesQuery
const getFavouritesQuery = async (idUser) => {
  let connection;
  try {
    //comenzamos la conexion
    connection = await getConnectionDB();
    //Query de los favoritos del user en id params (idUser)
    const [favExercises] = await connection.query(
      `
        SELECT exerciseId
        FROM favourites
        WHERE userId = ?
    `,
      [idUser]
    );
    //Recorremos el array
    let listFavourites = [];
    for (const exercises of favExercises) {
      listFavourites.push(exercises.exerciseId);
    }

    //Variable que almacena la informacion
    const infoFav = [];
    //Recorremos el array de listFavourites y hacemos la query a cada uno de los ejercicios y
    //los almacenamos en infoFav
    for (const exercises of listFavourites) {
      const [valuesFav] = await connection.query(
        `
            SELECT id,name,description,photo,typology,muscleGroup
            FROM exercises
            WHERE id = ?
        `,
        [exercises]
      );

      infoFav.push(valuesFav[0]);
    }

    //Recorrer cada objeto del array selectedExercices (cada ejercicio) y hacer la query
    //a los totalLikes y totalFavs. Creando una propiedad en cada objeto (en cada ejercicio).
    for (const exercise of infoFav) {
      const exerciseId = exercise.id;
      const totalLikes = await getTotalLikesQuery(exerciseId);
      exercise.likes = totalLikes.totalLikes;
    }

    for (const exercise of infoFav) {
      const exerciseId = exercise.id;
      const totalFavs = await getTotalFavsQuery(exerciseId);
      exercise.favs = totalFavs.totalFavs;
    }
    //Check de req.user existe. Si existe añade a cada objeto (cada ejercicio) el resultado de
    //las queries wasLikedQuery & isFavQuery
    if (idUser) {
      for (const exercise of infoFav) {
        const exerciseId = exercise.id;
        const wasLiked = await wasLikedQuery(idUser, exerciseId);
        exercise.wasLiked = wasLiked;
      }
    }

    if (idUser) {
      for (const exercise of infoFav) {
        const exerciseId = exercise.id;
        const isFav = await isFavQuery(idUser, exerciseId);
        exercise.isFav = isFav;
      }
    }

    if (infoFav.length === 0) {
      generateError('No tienes ningun ejercicio marcado como favorito', 404);
    }
    console.log(infoFav);
    return infoFav;
  } finally {
    if (connection) connection.release;
  }
};
module.exports = getFavouritesQuery;
