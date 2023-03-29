'use strict';

const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (msg, code) => {
  const error = new Error(msg);
  error.httpStatus = code;
  throw error;
};

/**
 * ###############
 * ## savePhoto ##
 * ###############
 */

const savePhoto = async (img) => {
  //Ruta absoluta al directorio de subida de imágenes
  const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

  //Check del directorio "uploads". Si no existe se crea
  try {
    await fs.access(uploadsPath);
  } catch {
    //acces lanza un error si intenta entrar en uploadsPath y este no existe
    //En este cath creamos entonces el directorio
    await fs.mkdir(uploadsPath);
  }

  //Procesado de la imagen. Conversión a objeto sharp
  const sharpImg = sharp(img.data);

  //Redimensionar la imagen para evitar que ocupe mucho espacio en disco
  sharpImg.resize(400);

  //Generación de un nombre único inequívoco para la imagen con uuid
  const imgName = `${uuid()}.jpg`;

  //Generación de la ruta absoluta a la imagen. Directorio + nombre de la imagen
  const imgPath = path.join(uploadsPath, imgName);

  //Guardado de la imagen procesada sharpImg en el directorio "uploads"
  await sharpImg.toFile(imgPath);

  //Return del nombre de la imagen imgName que será guardado en la base de datos
  return imgName;
};

/**
 * #################
 * ## deletePhoto ##
 * #################
 */

const deletePhoto = async (photoName) => {
  //Ruta absoluta a la foto
  const photoPath = path.join(__dirname, process.env.UPLOADS_DIR, photoName);

  //Check si la imagen existe. Si no existe se finaliza la función
  try {
    await fs.access(photoPath);
  } catch {
    return;
  }

  //Borrado de la imagen de la carpeta "uploads"
  await fs.unlink(photoPath);
};

/**
 * #####################
 * ## Validate Schema ##
 * #####################
 */

const validateSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    error.httpStatus = 400;
    throw error;
  }
};

module.exports = { generateError, savePhoto, deletePhoto, validateSchema };
