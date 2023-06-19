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
                return;
            }

            // Encripta la contraseña utilizando el salt
            bcrypt.hash(password, salt, async function (error, hash) {
                if (error) {
                    console.error('Error al encriptar la contraseña:', error);
                    return;
                }
                await connection.execute('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, hash]);
                // Liberar la conexión para que pueda ser reutilizada
                connection.release();
            });
        });
        return true
    }
}

exports.getUserFromDataBaseByEmail = async (email, password) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('Select * From users Where email = ?', [email]);
    return await bcrypt.compare(password, rows[0].password);
}
