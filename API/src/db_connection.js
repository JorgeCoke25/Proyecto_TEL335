const mysql = require('mysql2');

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '1234',
    database: 'stonksDB'
});

export default connection;
