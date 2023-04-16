const express = require('express');
const app = express();
const { Pool } = require('pg');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'stonksDB',
    password: '1234',
    port: 5432,
});

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

app.post('/api/register', (req, res) => {
    // Obtiene los datos del usuario desde el cuerpo de la solicitud
    console.log(req.body.email);
    const { email, name, password } = req.body;

    // Crea una consulta SQL para insertar al nuevo usuario en la base de datos
    const sqlQuery = 'INSERT INTO users (email, name, password) VALUES ($1, $2, $3)';
    const values = [email, name, password];

    // Ejecuta la consulta en la base de datos
    pool.query(sqlQuery, values, (error, result) => {
        if (error) {
            console.error('Error al registrar usuario: ', error);
            res.status(500).send('Error al registrar usuario');
        } else {
            console.log('Usuario registrado con éxito: ', result.rows[0]);
            res.status(200).send('Usuario registrado con éxito');
        }
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
