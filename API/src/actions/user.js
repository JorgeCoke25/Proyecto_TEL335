import {getConnection} from "../db_connection";
const bcrypt = require('bcrypt');


exports.getUsersFromDataBase = async () => {
    const connection = await getConnection();
    const [rows] = await connection.execute('Select * From users')
    // Liberar la conexión para que pueda ser reutilizada
    connection.release();
    return rows
}

exports.registerUserInDataBase = async (email, name, password) => {
    const connection = await getConnection();
    const saltRounds = 10;
    const exist = await connection.execute('Select * From users Where email = ?', [email])
    if (exist[0].length !== 0) {
        connection.release();
        return false
    } else {
        bcrypt.genSalt(saltRounds, function (error, salt) {
            if (error) {
                console.error('Error al generar el salt:', error);
                return false;
            }

            // Encripta la contraseña utilizando el salt
            bcrypt.hash(password, salt, async function (error, hash) {
                if (error) {
                    console.error('Error al encriptar la contraseña:', error);
                    return;
                }
                await connection.execute('INSERT INTO users (email, name, password,image) VALUES (?, ?, ?,?)', [email, name, hash, '']);
                // Liberar la conexión para que pueda ser reutilizada
                connection.release();
            });
        });
        return true
    }
}

exports.getUserFromDataBaseByEmailAuth = async (email, password) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('Select * From users Where email = ?', [email]);
    connection.release();
    if (await bcrypt.compare(password, rows[0].password)) {
        const jwt = require('jsonwebtoken');
        const token = jwt.sign(rows[0].id, process.env.JWT_SECRET);
        return {
            id: rows[0].id,
            email: rows[0].email,
            name: rows[0].name,
            image: rows[0].image,
            token: token
        }
    } else {
        return null
    }
}
exports.getUserById = async (id) => {
    const connection = await getConnection();
    const user = await connection.execute('Select * From users Where id = ?', [id]);
    connection.release();
    return user[0]

}
exports.PutUserPicture = async (id, b64) => {
    const connection = await getConnection();
    try {
        const buffer = Buffer.from(b64.split(',')[1], 'base64')
        await connection.execute('UPDATE users SET image = ? WHERE id = ?', [buffer, id]);
    } catch (e) {
        console.log(e)
    }
    connection.release();
    return true;
}

exports.PutUserName = async (id, name) => {
    const connection = await getConnection();
    try {
        await connection.execute('UPDATE users SET name = ? WHERE id = ?',[name,id])
    } catch (e) {
        console.log(e)
    }
    connection.release();
    return true
}
