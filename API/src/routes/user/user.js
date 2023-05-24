import userActions from '../../actions/user'

exports.getUsers= async(ctx)=>{
    try{
        const users = await userActions.getUsersFromDataBase();
        if(users.length===0){
            ctx.status=200;
            ctx.body ={
                status: 200,
                message: "No se encontró el usuario buscado"
            }
            return ctx
        }
        ctx.body ={
            users: users
        }
    }catch (e){
        ctx.status=500
        ctx.body=
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}
exports.registerUser= async (ctx)=>{
    try {
        await userActions.registerUserInDataBase(ctx.request.body.email,ctx.request.body.name,ctx.request.body.password)
        ctx.body={
            message: "Usuario registrado correctamente"
        }
    }catch (e){
        ctx.status=500
        ctx.body=
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}
