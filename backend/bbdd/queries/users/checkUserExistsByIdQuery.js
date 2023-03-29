'use strict';

//Conexión a DB
const getConnectionDB = require('../../getConnectionDB');

const checkUserExistsByIdQuery = async (id) => {
  let connection;

  try {
    connection = await getConnectionDB();

    const [user] = await connection.query(
      `
    SELECT id FROM users WHERE id = ?`,
      [id]
    );

    return user;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = checkUserExistsByIdQuery;
