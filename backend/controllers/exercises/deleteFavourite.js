'use strict';

//Query deleteLike
const deleteFavQuery = require('../../bbdd/queries/exercises/deleteFavQuery');

//Middleware deleteLike
const deleteFavourite = async (req, res, next) => {
  try {
    //Destructuring del path params. Da el id del ejercicio
    const { id: idExercise } = req.params;

    //Destructuring del id del user
    const { id: idUser } = req.user;

    //Query a DB
    await deleteFavQuery(idExercise, idUser);

    //Reponse
    res.send({
      status: 'ok',
      message: 'Has quitado el ejercicio de tus FAVORITOS',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteFavourite;
