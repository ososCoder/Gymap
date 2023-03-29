'use strict';
//JOI
const Joi = require('joi');

//Schema para validar en login del usuario (email & password)
const loginUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = loginUserSchema;
