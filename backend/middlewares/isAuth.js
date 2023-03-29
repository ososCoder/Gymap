'use strict';

//JWT
const jwt = require('jsonwebtoken');

//Helper Generate error
const { generateError } = require('../helpers');

//Middleware isAuth. Check del TOKEN. Si existe elTOKEN el usuario está logged.

const isAuth = async (req, res, next) => {
  try {
    //Destructuring del "authorization" del header. Contendrá el TOKEN
    const { authorization } = req.headers;

    //Check del authorization (TOKEN)
    if (!authorization) {
      generateError('Se necesita autenticación', 400);
    }

    //Variable para almacenar info del TOKEN.
    let tokenInfo;

    //Obtener info del TOKEN
    try {
      tokenInfo = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch {
      generateError('TOKEN incorrecto', 401);
    }

    //Creación de nueva propiedad en "request" para guardar info del TOKEN
    req.user = tokenInfo;

    //Next al siguiente controlador
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
