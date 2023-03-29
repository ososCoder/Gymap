'use strict';

//Query
const listExercisesQuery = require('../../bbdd/queries/exercises/listExercisesQuery');

const listExercises = async (req, res, next) => {
  try {
    //Desctructuring de los req.query
    const { typology, muscleGroup } = req.query;

    //Query a los ejercicios con los filtros (req.query)
    const exercises = await listExercisesQuery(typology, muscleGroup, req.user);

    //Response
    res.send({
      status: 'ok',
      data: {
        exercises,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listExercises;
