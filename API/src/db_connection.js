const mysql = require('mysql2');

// Configura la conexión a la base de datos
export const dbConfig=({
    host: 'localhost',
    user: 'admin',
    password: '1234',
    database: 'stonksDB'
});

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

// Obtener una conexión del pool
export const getConnection = () => {
    return pool.promise().getConnection();
};


