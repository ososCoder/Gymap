'use strict';

//Conexión
const getConnectionDB = require('../../getConnectionDB');

//Queries
const getTotalLikesQuery = require('./getTotalLikesQuery');
const getTotalFavsQuery = require('./getTotalFavsQuery');
const wasLikedQuery = require('./wasLikedQuery');
const isFavQuery = require('./isFavQuery');

const listExercisesQuery = async (typology = '', muscleGroup = '', userId) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Query a la DB con typology + muscleGroup
    const [selectedExercises] = await connection.query(
      `
        SELECT id, name, description, photo, typology, muscleGroup
        FROM exercises
        WHERE typology LIKE ? AND muscleGroup LIKE ? 
        ORDER BY id DESC
    `,
      [`%${typology}%`, `%${muscleGroup}%`]
    );

    //Recorrer cada objeto del array selectedExercices (cada ejercicio) y hacer la query
    //a los totalLikes y totalFavs. Creando una propiedad en cada objeto (en cada ejercicio).
    for (const exercise of selectedExercises) {
      const exerciseId = exercise.id;
      const totalLikes = await getTotalLikesQuery(exerciseId);
      exercise.likes = totalLikes.totalLikes;
    }

    for (const exercise of selectedExercises) {
      const exerciseId = exercise.id;
      const totalFavs = await getTotalFavsQuery(exerciseId);
      exercise.favs = totalFavs.totalFavs;
    }

    //Check de req.user existe. Si existe añade a cada objeto (cada ejercicio) el resultado de
    //las queries wasLikedQuery & isFavQuery
    if (userId) {
      for (const exercise of selectedExercises) {
        const exerciseId = exercise.id;
        const wasLiked = await wasLikedQuery(userId.id, exerciseId);
        exercise.wasLiked = wasLiked;
      }
    }

    if (userId) {
      for (const exercise of selectedExercises) {
        const exerciseId = exercise.id;
        const isFav = await isFavQuery(userId.id, exerciseId);
        exercise.isFav = isFav;
      }
    }
    //Return de selectedExercises
    return selectedExercises;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listExercisesQuery;
