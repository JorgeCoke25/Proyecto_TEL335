import {getConnection} from "../db_connection";

exports.PostMovementFromUser=async (id,mount,type,persistent,date,description)=>{
    const connection = await getConnection()
    try{
        await connection.execute(
            'INSERT INTO movement (mount,type,persistent,date,description,id_user) VALUES (?, ?, ?, ?, ?, ?)',
            [mount,type,persistent,date,description,id])
        connection.release()
        return true
    }catch (e) {
        console.log(e)
        connection.release()
    }
}
