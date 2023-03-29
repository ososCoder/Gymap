'use strict';

//Query exerciseExists
const exerciseExistsQuery = require('../bbdd/queries/exercises/exerciseExistsQuery');

//Middleware que comprueba que existe el ejercicio de path params (:id) en el DB
const exerciseExists = async (req, res, next) => {
  try {
    //Variable que guardará el id del ejercicio de path params
    const { id } = req.params;

    //Query de consulta del id del ejercicio a la DB
    await exerciseExistsQuery(id);

    //Next al siguiente controlador
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = exerciseExists;
