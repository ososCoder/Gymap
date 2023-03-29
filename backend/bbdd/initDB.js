'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');

const getConnectionDB = require('./getConnectionDB');

//Creación de las tablas de la DB gym

const createDB = async () => {
  //Variable que almacenará la conexión libre
  let connection;

  try {
    //Conectamos con la DB
    connection = await getConnectionDB();

    //Eliminación de las tablas de la DB si existen
    console.log('Borrando las tablas de gym...');

    await connection.query('DROP TABLE IF EXISTS favourites');
    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS exercises');
    await connection.query('DROP TABLE IF EXISTS users');

    //Creación de tablas
    console.log('Creando las tablas de gym...');

    await connection.query(`
    CREATE TABLE users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        avatar VARCHAR(100),
        role ENUM("admin","member") DEFAULT "member" NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    `);

    await connection.query(`
    CREATE TABLE exercises (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        photo VARCHAR(100) NOT NULL,
        typology VARCHAR(100) NOT NULL,
        muscleGroup VARCHAR(100) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        userId INT UNSIGNED NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    )   
    `);

    await connection.query(`
    CREATE TABLE likes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        userId INT UNSIGNED NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),

        exerciseId INT UNSIGNED NOT NULL,
        FOREIGN KEY (exerciseId) REFERENCES exercises(id)
    )
    `);

    await connection.query(`
    CREATE TABLE favourites (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        userId INT UNSIGNED NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),

        exerciseId INT UNSIGNED NOT NULL,
        FOREIGN KEY (exerciseId) REFERENCES exercises(id)
    )
    `);

    //Creación del usuario ADMIN
    console.log('Creando el usuario ADMIN');

    const hashedPassAdmin = await bcrypt.hash(process.env.USER_ADMIN_PWD, 10);

    await connection.query(`
        INSERT INTO users(name, email, password, role)
        VALUES (
          '${process.env.USER_ADMIN_NAME}',
          '${process.env.USER_ADMIN_EMAIL}',
          '${hashedPassAdmin}',
          'admin'
        )
    `);
  } catch (error) {
    console.error(error);
  } finally {
    //Desconexión
    if (connection) connection.release();

    //Cierre del proceso
    process.exit();
  }
};

//Llamada a la función para crear la DB
createDB();
