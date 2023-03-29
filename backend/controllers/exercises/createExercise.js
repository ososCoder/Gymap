'use strict';

//Helper generate error
const { generateError, savePhoto } = require('../../helpers');

//Query createexerciseQuery
const createExerciseQuery = require('../../bbdd/queries/exercises/createExerciseQuery');

//Middleware createexercise
const createExercise = async (req, res, next) => {
  try {
    //ADMIN check. Solo el ADMIN puede crear nuevos ejercicios
    if (req.user.role !== 'admin') {
      generateError('Solo el ADMIN puede crear nuevos ejercicios', 401);
    }

    //Check de req.body correcto
    const { name, description, typology, muscleGroup } = req.body;

    if (!name || !description || !typology || !muscleGroup) {
      generateError(
        'Faltan campos para poder publicar un nuevo ejercicio',
        400
      );
    }

    //Check de photo en req.files
    //Variable que almacenará la photo
    let imgNameExercise;

    //Check de la imagen
    if (req.files?.photo) {
      //Guardado de la imagen en el directorio "uploads" y obtención del nombre
      //Para ello se utiliza la función savePhoto.
      imgNameExercise = await savePhoto(req.files.photo);
    } else {
      generateError(
        'La imagen del ejercicio es obligatoria para su publicación',
        400
      );
    }

    //Una vez se ha guardado la imagen en el directorio "uploads", se necesita una query para guardar toda la info en la DB
    await createExerciseQuery(req.body, imgNameExercise, req.user.id);

    //Response
    res.send({
      status: 'ok',
      message: 'Nuevo ejercicio creado correctamente',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createExercise;
