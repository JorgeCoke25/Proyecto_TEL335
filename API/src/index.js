import koa from 'koa'
import bodyParser from 'koa-body'
import router from './routes/index'

const app = new koa();
const port = 8080;



app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(router.routes())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

import connection from "./db_connection";
// Conecta a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});




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
