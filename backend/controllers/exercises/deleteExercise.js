'use strict';

//Queries
const deleteExerciseLikesQuery = require('../../bbdd/queries/exercises/deleteExerciseLikesQuery');
const deleteExerciseQuery = require('../../bbdd/queries/exercises/deleteExerciseQuery');
const deleteExerciseFavsQuery = require('../../bbdd/queries/exercises/deleteExerciseFavsQuery');
const getPhotoNameQuery = require('../../bbdd/queries/exercises/getPhotoNameQuery');

//Helpers
const { generateError, deletePhoto } = require('../../helpers');

//Middleware para borrar un ejercicio. SOLO ADMIN
const deleteExercise = async (req, res, next) => {
  try {
    //ADMIN check. Solo el ADMIN puede crear nuevos ejercicios
    if (req.user.role !== 'admin') {
      generateError('Solo el ADMIN puede borrar ejercicios', 401);
    }

    //Destructuring params
    const { id: idExercise } = req.params;

    //Query para obtener el nombre de la photo en la DB
    const photoName = await getPhotoNameQuery(idExercise);

    console.log(photoName);
    //Borrado de la photo en local "uploads"
    await deletePhoto(photoName.photo);

    //Borrado de los LIKES del ejercicio a eliminar
    await deleteExerciseLikesQuery(idExercise);

    //Borrado de los FAVOURITES del ejercicio a eliminar
    await deleteExerciseFavsQuery(idExercise);

    //Borrado del ejercicio en la DB
    await deleteExerciseQuery(idExercise);

    res.send({
      status: 'ok',
      message: `Se ha eliminado el ejercicio ${idExercise}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteExercise;
