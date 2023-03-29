'use strict';

//Require externos
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

//Creación del server
const app = express();

/**
 * #############################
 * ## Middlewares funcionales ##
 * #############################
 */

//Middleware Morgan
app.use(morgan('dev'));

//Middleware parse json del body
app.use(express.json());

//Middleware CORS para conexión con React
app.use(cors());

//Middlewares para archivos estáticos. Indica directorio de los mismo
app.use(express.static(process.env.UPLOADS_DIR));

//Middleware fileUpload. Crea la propiedad "files" en el "request".
//De esta forma se puede acceder a el en el controlador createexercise para subir la imagen
app.use(fileUpload());

/**
 * #######################
 * ## Middlewares Users ##
 * #######################
 */

//Requires
const newUser = require('./controllers/users/newUser');
const loginUser = require('./controllers/users/loginUser');
const userExists = require('./middlewares/userExists');
const isAuth = require('./middlewares/isAuth');
const infoUser = require('./controllers/users/infoUser');
const deleteUser = require('./controllers/users/deleteUser');
const modifyUser = require('./controllers/users/modifyUser');
const modifyPwd = require('./controllers/users/modifyPwd');
const getOwnUser = require('./controllers/users/getOwnUser');

//Nuevo usuario
app.post('/users', newUser);

//Login usuario
app.post('/users/login', loginUser);

//Info usuario
app.get('/users/:id', userExists, isAuth, infoUser);

//Info usuario logueado
app.get('/users', isAuth, getOwnUser);

//Eliminar usuario (solo admin)
app.delete('/users/:id', userExists, isAuth, deleteUser);

//Editar usuario
app.put('/users/:id', userExists, isAuth, modifyUser);

//Editar contraseña
app.put('/users/:id/password', userExists, isAuth, modifyPwd);

/**
 * ###########################
 * ## Middlewares exercises ##
 * ###########################
 */

//Requires
const createExercise = require('./controllers/exercises/createExercise');
const exerciseExists = require('./middlewares/exerciseExists');
const modifyExercise = require('./controllers/exercises/modifyExercise');
const listExercises = require('./controllers/exercises/listExercises');
const getExercise = require('./controllers/exercises/getExercise');
const postLike = require('./controllers/exercises/postLike');
const deleteLike = require('./controllers/exercises/deleteLike');
const deleteExercise = require('./controllers/exercises/deleteExercise');
const addFavourite = require('./controllers/exercises/addFavourite');
const deleteFavourite = require('./controllers/exercises/deleteFavourite');
const getFavourites = require('./controllers/exercises/getFavourites');
const isOptionalAuth = require('./middlewares/isOptionalAuth');

//ADMIN USER
//Create exercise
app.post('/exercises', isAuth, createExercise);

//Modify exercise
app.put('/exercises/:id', isAuth, exerciseExists, modifyExercise);

//Delete exercise
app.delete('/exercises/:id', isAuth, exerciseExists, deleteExercise);

//MEMBER USER
//List exercises
app.get('/exercises', isOptionalAuth, listExercises);

//Get exercise
app.get('/exercises/:id', isOptionalAuth, exerciseExists, getExercise);

//Post like
app.post('/exercises/:id/likes', isAuth, exerciseExists, postLike);

//Delete like
app.delete('/exercises/:id/likes', isAuth, exerciseExists, deleteLike);

//Favourites add
app.post('/exercises/:id/favourites', isAuth, exerciseExists, addFavourite);

//Favourites delete
app.delete(
  '/exercises/:id/favourites',
  isAuth,
  exerciseExists,
  deleteFavourite
);

//Favourites get
app.get('/favourites/:id', userExists, isAuth, getFavourites);

/**
 * ################################################
 * ## Middlewares Control Errors & Server Listen ##
 * ################################################
 */

// Middleware de error.
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
});

//Server listen
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
