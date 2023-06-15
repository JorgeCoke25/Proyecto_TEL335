import {getConnection} from "../db_connection";

exports.getUsersFromDataBase = async ()=> {
    const connection = await getConnection();
    const [rows] = await connection.execute('Select * From users')
    // Liberar la conexión para que pueda ser reutilizada
    connection.release();
    return rows
}

exports.registerUserInDataBase = async(email,name,password)=>{
    const connection = await getConnection();
    await connection.execute('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, password]);
    // Liberar la conexión para que pueda ser reutilizada
    connection.release();
}

exports.getUserFromDataBaseByEmail = async (email,password)=>{
    const connection = await getConnection();
    const [rows] =  await connection.execute('Select * From users Where email = ?', [email]);
    connection.release();
    return rows[0].password === password;
}
