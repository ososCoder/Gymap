'use strict';

//Conexión DB
const getConnectionDB = require('../../getConnectionDB');

const modifyUserQuery = async (userData) => {
  let connection;

  try {
    connection = await getConnectionDB();

    //Destructuring del argumento de la función (req.body)
    const { name, imgNameUser, id } = userData;
    console.log(name);
    console.log(imgNameUser);
    console.log(id);
    //Query de UPDATE user
    await connection.query(
      `
        UPDATE users
        SET name = ?, avatar = ?
        WHERE id = ?
    `,
      [name, imgNameUser, id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = modifyUserQuery;
