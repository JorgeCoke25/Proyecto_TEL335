import koa from 'koa'
import bodyParser from 'koa-body'
import router from './routes/index'
import {dbConfig} from "./db_connection";
import mysql from 'mysql2';
import cors from '@koa/cors';
import {DefaultPicUrl} from "./aws_connection";

const app = new koa();
app.use(cors());
const port = 8080;
require('dotenv').config();



app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(router.routes())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}).on("error", function (err) {
        process.once("SIGUSR2", function () {
            process.kill(process.pid, "SIGUSR2");
        });
        process.on("SIGINT", function () {
            process.kill(process.pid, "SIGINT");
        });
    });

// Función de verificación de conexión
const testConnection = async () => {
    const connection = mysql.createConnection(dbConfig);

    try {
        // Intentar establecer la conexión
        await connection.promise().query('SELECT 1');

        console.log('La conexión con la base de datos se ha establecido correctamente.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
    } finally {
        // Cerrar la conexión
        connection.end();
    }
};

// Llamar a la función de verificación de conexión al iniciar la API
testConnection();


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
