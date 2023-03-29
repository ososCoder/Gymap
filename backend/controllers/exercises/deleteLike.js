'use strict';

//Query deleteLike
const deleteLikeQuery = require('../../bbdd/queries/exercises/deleteLikeQuery');

//Middleware deleteLike
const deleteLike = async (req, res, next) => {
  try {
    //Destructuring del path params. Da el id del ejercicio
    const { id: idExercise } = req.params;

    //Destructuring del id del user
    const { id: idUser } = req.user;

    //Query a DB
    await deleteLikeQuery(idExercise, idUser);

    //Reponse
    res.send({
      status: 'ok',
      message: 'Has quitado el LIKE',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteLike;
