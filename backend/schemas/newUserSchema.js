'use strict';
//JOI
const Joi = require('joi');

//Schema para validar en nuevo usuario (name, email, password)
const newUserSchema = Joi.object().keys({
  name: Joi.string().required().min(5),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(100)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  //Regex de al mínimo 8 caracteres y al menos una letra y un número
});

module.exports = newUserSchema;
