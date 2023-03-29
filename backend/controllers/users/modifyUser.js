'use strict';

//Helpers
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

//Queries
const modifyUserQuery = require('../../bbdd/queries/users/modifyUserQuery');
const infoUserQuery = require('../../bbdd/queries/users/selectUserInfoByIdQuery');

//Middleware modifyUser
const modifyUser = async (req, res, next) => {
  try {
    //Destructuring del body
    let { name } = req.body;
    //Req params
    const { id } = req.params;
    //Check del ADMIN
    if (req.user.id !== Number(id)) {
      generateError('Solo puedes editar tus datos', 401);
    }
    //Si faltan campos generamos un error
    if (!name && !req.files?.avatar) {
      generateError('Faltan campos', 400);
    }

    //Query para traer toda la info del usuario de la DB
    const infoUser = await infoUserQuery(id);

    //Destructuring de infoUser from DB
    const { name: nameDB, avatar: avatarDB } = infoUser;

    //Check de contenido. Si no se modifica se asigna el valor de la DB
    name = name || nameDB;

    //GESTIÓN DEL AVATAR
    //Check de avatar en req.files
    //Variable que almacenará el avatar
    let imgNameUser;

    //Check de la imagen
    if (req.files?.avatar) {
      //Borrar la foto anterior si existe una nueva
      if (avatarDB) {
        await deletePhoto(avatarDB);
        //Guardado de la imagen en el directorio "uploads" y obtención del nombre
        //Para ello se utiliza la función savePhoto.
        imgNameUser = await savePhoto(req.files.avatar);
      } else if (!avatarDB) {
        imgNameUser = await savePhoto(req.files.avatar);
      }
    }

    imgNameUser = imgNameUser || avatarDB;

    //Objeto como parametro
    const userData = {
      name,
      imgNameUser,
      id,
    };

    //Query update de datos del exercise del path params
    await modifyUserQuery(userData);

    //Response
    res.send({
      status: 'ok',
      message: `Usuario modificado correctamente`,
      data: {
        name,
        avatar: imgNameUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = modifyUser;
