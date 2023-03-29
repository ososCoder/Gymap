'use strict';

//Queries
const infoExerciseQuery = require('../../bbdd/queries/exercises/infoExerciseQuery');
const getTotalLikesQuery = require('../../bbdd/queries/exercises/getTotalLikesQuery');
const wasLikedQuery = require('../../bbdd/queries/exercises/wasLikedQuery');
const isFavQuery = require('../../bbdd/queries/exercises/isFavQuery');
const getTotalFavsQuery = require('../../bbdd/queries/exercises/getTotalFavsQuery');

//Middleware getExercise
const getExercise = async (req, res, next) => {
  try {
    //Destructuring del path params
    const { id } = req.params;

    //Query a infoExerciseQuery (Reutilizada)
    const infoExercise = await infoExerciseQuery(id);

    //Destructuring infoExercise
    const { name, description, photo, typology, muscleGroup } = infoExercise;

    //Query que devuelve likes
    const likes = await getTotalLikesQuery(id);
    //Query que devuelve las veces que ha sido fav
    const favs = await getTotalFavsQuery(id);

    //WAS LIKED??
    let wasLiked;
    //Check de req.user. Si existe se hace una query para saber si el ejercicio ha sido dado like en DB
    if (req.user) {
      wasLiked = await wasLikedQuery(req.user.id, id);
    }

    //IS FAV??
    let isFav;
    //Check. Query para saber si el ejercicio es fav o no
    if (req.user) {
      isFav = await isFavQuery(req.user.id, id);
    }

    //Response
    res.send({
      status: 'ok',
      data: {
        name,
        description,
        photo,
        typology,
        muscleGroup,
        likes: likes.totalLikes,
        favs: favs.totalFavs,
        wasLiked,
        isFav,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getExercise;
