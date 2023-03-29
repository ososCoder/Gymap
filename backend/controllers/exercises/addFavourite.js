'use strict';

//Query
const addFavouriteQuery = require('../../bbdd/queries/exercises/addFavouriteQuery');

//Middleware addFavourite para añadir like a un ejercicio
const addFavourite = async (req, res, next) => {
  try {
    //Destructuring path params
    const { id: idExercise } = req.params;

    //Destructuring req.user
    const { id: idUser } = req.user;

    //Query INSERT a tabla likes
    await addFavouriteQuery(idExercise, idUser);

    //Response
    res.send({
      status: 'ok',
      message: `Has añadido el ejercicio a tus FAVORITOS`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addFavourite;
