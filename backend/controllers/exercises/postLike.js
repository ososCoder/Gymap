'use strict';

//Query postLikeQuery
const postLikeQuery = require('../../bbdd/queries/exercises/postLikeQuery');

//Middleware postLike para añadir like a un ejercicio
const postLike = async (req, res, next) => {
  try {
    //Destructuring path params
    const { id: idExercise } = req.params;

    //Destructuring req.user
    const { id: idUser } = req.user;

    //Query INSERT a tabla likes
    await postLikeQuery(idExercise, idUser);

    //Response
    res.send({
      status: 'ok',
      data: `Has dado like al ejercicio`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postLike;
