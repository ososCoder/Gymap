'use strict';

//Helpers
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

//Queries
const modifyExerciseQuery = require('../../bbdd/queries/exercises/modifyExerciseQuery');
const infoExerciseQuery = require('../../bbdd/queries/exercises/infoExerciseQuery');

//Middleware modifyExercise
const modifyExercise = async (req, res, next) => {
  try {
    //Destructuring del body
    let { name, description, typology, muscleGroup } = req.body;

    //Check del ADMIN
    if (req.user.role !== 'admin') {
      generateError('Solo el ADMIN puede modificar un ejercicio', 401);
    }

    //Si faltan campos generamos un error
    if (
      !name &&
      !description &&
      !typology &&
      !muscleGroup &&
      !req.files?.photo
    ) {
      generateError('Faltan campos', 400);
    }
    console.log('Hola', req.files);
    //Destructuring del path params
    const { id: idExercise } = req.params;

    //Query para traer toda la info del ejercicio de la DB
    const infoExercise = await infoExerciseQuery(idExercise);

    //Destructuring de infoExercise from DB
    const {
      name: nameDB,
      description: descriptionDB,
      photo: photoDB,
      typology: typologyDB,
      muscleGroup: muscleGroupDB,
    } = infoExercise;

    //Check de contenido. Si no se modifica se asigna el valor de la DB
    name = name || nameDB;
    description = description || descriptionDB;
    typology = typology || typologyDB;
    muscleGroup = muscleGroup || muscleGroupDB;

    //GESTIÓN DE LA PHOTO
    //Check de photo en req.files
    //Variable que almacenará la photo
    let imgNameExercise;

    //Check de la imagen
    if (req.files?.photo) {
      //Borrar la foto anterior si existe una nueva
      await deletePhoto(photoDB);

      //Guardado de la imagen en el directorio "uploads" y obtención del nombre
      //Para ello se utiliza la función savePhoto.
      imgNameExercise = await savePhoto(req.files.photo);
    }

    imgNameExercise = imgNameExercise || photoDB;

    //Objeto como parametro
    const exerciseData = {
      name,
      description,
      typology,
      muscleGroup,
      imgNameExercise,
      idExercise,
    };

    //Query update de datos del exercise del path params
    await modifyExerciseQuery(exerciseData);

    //Response
    res.send({
      status: 'ok',
      message: `Ejercicio ${idExercise} modificado correctamente`,
      data: {
        exercise: {
          name,
          description,
          typology,
          muscleGroup,
          photo: imgNameExercise,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = modifyExercise;
