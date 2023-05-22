import koa from 'koa'
import bodyParser from 'koa-body'
import router from './routes/index'

const { Pool } = require('pg');

const app = new koa();
const port = 8080;

const pool = new Pool({
    user: 'stonks',
    host: '172.20.0.2',
    database: 'stonksDB',
    password: '1234',
    port: 5432,
});

app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(router.routes())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

/*
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
*/
