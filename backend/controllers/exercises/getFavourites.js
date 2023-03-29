'use strict';

const getFavouritesQuery = require('../../bbdd/queries/exercises/getFavouritesQuery');
//Generate Error
const { generateError } = require('./../../helpers');

//Middleware getFavourites para añadir like a un ejercicio
const getFavourites = async (req, res, next) => {
  try {
    //Destructuring req.user
    const { id: idUser } = req.user;

    //Req.params
    const { id } = req.params;

    if (idUser !== Number(id)) {
      generateError('No tienes permiso para ver estos favoritos', 401);
    }
    //Query SELECT a tabla favourites y exercises
    const infoFav = await getFavouritesQuery(idUser);

    //Response
    res.send({
      status: 'ok',
      data: {
        exercises: infoFav,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getFavourites;
