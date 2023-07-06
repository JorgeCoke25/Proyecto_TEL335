import {getConnection} from "../db_connection";

exports.PostMovementFromUser=async (id,mount,type,category,date,description)=>{
    const connection = await getConnection()
    try{
        await connection.execute(
            'INSERT INTO movement (mount,type,category,date,description,id_user) VALUES (?, ?, ?, ?, ?, ?)',
            [mount,type,category,date,description,id])
        connection.release()
        return true
    }catch (e) {
        console.log(e)
        connection.release()
    }
}
exports.DeleteMovementFromUser = async (id,id_user)=>{
    const connection = await getConnection()
    try{
        const done = connection.execute(
            'DELETE from movement WHERE id = ? AND id_user = ?',
            [id,id_user]
        ).catch(e=>{
            console.log(e)
        })
        connection.release()
        return done;
    }catch (e) {
        console.log(e)
        connection.release()
    }
}

exports.GetMovementsFromUser = async (id)=>{
    const connection = await getConnection()
    try{
        const movements = connection.execute(
            'SELECT * from movement WHERE id_user = ? ORDER BY date ASC',
            [id]
        ).catch(e=>{
            console.log(e)
        })
        connection.release()
        return movements;
    }catch (e) {
        console.log(e)
        connection.release()
    }
}
exports.GetMovementFromID = async (id)=>{
    const connection = await getConnection()
    try{
        const movement = connection.execute(
            'SELECT * from movement WHERE id = ?',
            [id]
        ).catch(e=>{
            console.log(e)
        })
        connection.release()
        return movement;
    }catch (e) {
        console.log(e)
        connection.release()
    }
}
exports.EditMovementFromID = async (mount,type,category,description, date, id)=>{
    const connection = await getConnection()
    try{
        const movement = connection.execute(
            'UPDATE movement SET mount = ?, type = ? ,category = ? , description = ? ,date = ? WHERE id = ?',
            [mount,type,category,description,date,id]
        ).catch(e=>{
            console.log(e)
        })
        connection.release()
        return movement;
    }catch (e) {
        console.log(e)
        connection.release()
    }
}
