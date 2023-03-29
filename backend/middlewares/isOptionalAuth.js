'use strict';

//JWT
const jwt = require('jsonwebtoken');

//Middleware isAuth. Check del TOKEN. Si existe elTOKEN el usuario está logged.

const isOptionalAuth = async (req, res, next) => {
  try {
    //Destructuring del "authorization" del header. Contendrá el TOKEN
    const { authorization } = req.headers;

    //Obtener info del TOKEN

    if (authorization && authorization !== 'null') {
      //Variable para almacenar info del TOKEN.
      let tokenInfo;
      tokenInfo = jwt.verify(authorization, process.env.JWT_SECRET);
      //Creación de nueva propiedad en "request" para guardar info del TOKEN
      req.user = tokenInfo;
    }

    //Next al siguiente controlador
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isOptionalAuth;
