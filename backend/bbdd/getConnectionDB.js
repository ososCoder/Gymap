'use strict';

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_BBDD } = process.env;

//Variable que almacenará el grupo de conexiones
let pool;

//Función de conexión
const getConnectionDB = async () => {
  try {
    //Si no existe el pool de conexiones se crea.
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_BBDD,
        timezone: 'Z',
      });
    }

    //Retornar conexión
    return await pool.getConnection();
  } catch (error) {
    console.error(error);

    throw new Error('Error de conexión con mySQL');
  }
};

module.exports = getConnectionDB;
