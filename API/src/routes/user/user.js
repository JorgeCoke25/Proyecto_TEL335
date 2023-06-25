import userActions from '../../actions/user'
import {use} from "bcrypt/promises";

const jwt = require('jsonwebtoken');


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
        const id = await userActions.getUserFromDataBaseByEmail(ctx.request.body.email, ctx.request.body.password)
        if (id!=null) {
            const token = jwt.sign({userEmail: ctx.request.body.email}, 'StonksKey');
            ctx.body = {
                token: token,
                id: id,
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
        if (user!=null) {
            ctx.body = {
                user: user,
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
        ctx.status = 500
        ctx.body =
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}
