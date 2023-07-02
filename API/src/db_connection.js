const mysql = require('mysql2');
require('dotenv').config();


// Configura la conexión a la base de datos
export const dbConfig=({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

// Obtener una conexión del pool
export const getConnection = () => {
    return pool.promise().getConnection();
};


