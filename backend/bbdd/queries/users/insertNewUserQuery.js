'use strict';

const getConnectionDB = require('../../getConnectionDB');
const bcrypt = require('bcrypt');

const { generateError } = require('../../../helpers');

const insertNewUserQuery = async (name, email, password) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Check de email repetido en DB
    const [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    //Si el email ya existe en DB se genera un error
    if (users.length > 0) {
      generateError('El email indicado ya existe', 409);
    }

    //Encriptado de contraseña
    const hashedPass = await bcrypt.hash(password, 10);

    //Insert del new user en el DB
    await connection.query(
      `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `,
      [name, email, hashedPass]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNewUserQuery;
