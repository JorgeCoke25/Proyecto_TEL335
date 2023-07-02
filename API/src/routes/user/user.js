import userActions from '../../actions/user'


exports.getUsers = async (ctx) => {
    try {
        const users = await userActions.getUsersFromDataBase();
        if (users.length === 0) {
            ctx.status = 200;
            ctx.body = {
                status: 200,
                message: "No se encontró el usuario buscado"
            }
            return ctx
        }

        ctx.body = {
            users: users
        }
    } catch (e) {
        ctx.status = 500
        ctx.body =
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}
exports.registerUser = async (ctx) => {
    try {
        const valid = await userActions.registerUserInDataBase(ctx.request.body.email, ctx.request.body.name, ctx.request.body.password)
        if (valid) {
            ctx.body = {
                status: 200,
                message: "Usuario registrado correctamente"
            }
            return ctx
        } else {
            ctx.status = 409
            ctx.body =
                {
                    status: 409,
                    message: "Este usuario ya tiene una cuenta con este correo registrado"
                }
            return ctx
        }
    } catch (e) {
        ctx.status = 500
        ctx.body =
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
        return ctx
    }
}

exports.LoginUser = async (ctx) => {
    try {
        const user = await userActions.getUserFromDataBaseByEmailAuth(ctx.request.body.email, ctx.request.body.password)
        if (user != null) {
            ctx.body = {
                user: user,
                message: "Usuario validado"
            }
            return ctx;
        } else {
            ctx.status = 401
            ctx.body = {
                message: "Contraseña incorrecta"
            }
            return ctx;
        }

    } catch (e) {
        ctx.status = 500
        ctx.body =
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}

exports.GetUser = async (ctx) => {
    try {
        const user = await userActions.getUserById(ctx.params.id)
        if (user.length!==0) {
            const convertImageUser=(user)=>{
                const image = (user[0].image)?.toString("base64")
                return{
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    password: user[0].password,
                    image: image
                }
            }
            ctx.body = {
                user: convertImageUser(user),
                message: "Usuario validado"
            }
            return ctx;
        } else {
            ctx.status = 404
            ctx.body = {
                message: "Usuario no encontrado"
            }
            return ctx;
        }

    } catch (e) {
        console.log(e   )
        ctx.status = 500
        ctx.body =
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}
exports.PutPicture = async (ctx) => {
    const b64 = ctx.request.body.data;
    try {
        const bool = await userActions.PutUserPicture(ctx.params.id, b64);
        if (bool) {
            ctx.body = {
                status: 200,
                message: "Foto de perfil subida correctamente"
            }
            return ctx
        } else {
            ctx.status = 500
            ctx.body =
                {
                    status: 500,
                    message: "Hubo un problema con la foto de perfil"
                }
            return ctx
        }
    } catch (e) {
        ctx.status = 500
        ctx.body =
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}

exports.PutName = async (ctx)=>{
    try {
        const bool = await userActions.PutUserName(ctx.params.id, ctx.request.body.name);
        if (bool) {
            ctx.body = {
                "status": 200,
                "message": "Nombre cambiado correctamente"
            }
            return ctx
        } else {
            ctx.status = 500
            ctx.body =
                {
                    status: 500,
                    message: "Hubo un problem en actualizar el nombre"
                }
            return ctx
        }
    }catch (e) {
        ctx.status = 500
        ctx.body =
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}
