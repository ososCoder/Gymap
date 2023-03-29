'use strict';

//Conexión DB
const getConnectionDB = require('./../../getConnectionDB');

//Bcrypt
const bcrypt = require('bcrypt');

//Helpers
const { generateError } = require('../../../helpers');

//Funcion modificar contraseña en DB
const modifyPwdQuery = async (userId, actualPassword, newPassword) => {
  let connection;
  try {
    connection = await getConnectionDB();

    //Query que selecciona la constraseña actual
    const [actualPasswordDB] = await connection.query(
      `
    SELECT password FROM users WHERE id=?
    `,
      [userId]
    );

    //Desctructuring de la Query
    const { password: actualPwdDB } = actualPasswordDB[0];

    //Check de contraseña actual enviada por el usuario con la contraseña actual en DB
    const pwdOk = await bcrypt.compare(actualPassword, actualPwdDB);

    if (!pwdOk) {
      generateError('Rufian! Esa no es tu contraseña!', 401);
    }

    //Hash de la nueva contraseña
    const hashedNewPwd = await bcrypt.hash(newPassword, 10);

    //Query para UPDATE de PWD
    await connection.query(
      `
        UPDATE users SET password = ? WHERE id=?
        `,
      [hashedNewPwd, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};
module.exports = modifyPwdQuery;
