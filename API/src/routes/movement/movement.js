import movementActions from '../../actions/movement'

exports.PostMovement = async (ctx) => {
    try {
        await movementActions.PostMovementFromUser(
            ctx.params.id_user,
            ctx.request.body.mount,
            ctx.request.body.type,
            ctx.request.body.category,
            ctx.request.body.date,
            ctx.request.body.description
        ).then(() => {
            ctx.body = {
                status: 200,
                message: "Movimiento registrado correctamente"
            }
            return ctx
        })
    } catch (e) {
        ctx.status = 500
        ctx.body =
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}
exports.DeleteMovement = async (ctx) => {
    try {
        const done = await movementActions.DeleteMovementFromUser(ctx.params.id, ctx.params.id_user)
        if (done) {
            ctx.status = 200
            ctx.body = {
                movements: 'Movimiento borrado correctamente',
            }
            return ctx
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            message: 'Hubo un problema al procesar los datos del los movimientos'
        }
        return ctx
    }
}
exports.GetMovements = async (ctx) => {
    try {
        const [movements] = await movementActions.GetMovementsFromUser(ctx.params.id)
        ctx.status = 200
        ctx.body = {
            movements: movements,
        }
        return ctx

    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            message: 'Hubo un problema al procesar los datos del los movimientos'
        }
        return ctx
    }
}
exports.GetMovement = async (ctx) => {
    try {
        const [movement] = await movementActions.GetMovementFromID(ctx.params.id)
        if (movement.length === 0) {
            ctx.status = 404
            ctx.body = {
                message: 'No se ha encontrado este movimiento'
            }
            return ctx
        } else {
            ctx.status = 200
            ctx.body = movement
            return ctx
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            message: 'Hubo un problema al procesar los datos del movimiento'
        }
        return ctx
    }
}
exports.UpdateMovement = async (ctx) => {
    try {
        await movementActions.EditMovementFromID(
            ctx.request.body.mount,
            ctx.request.body.type,
            ctx.request.body.category,
            ctx.request.body.description,
            ctx.request.body.date,
            ctx.params.id
        )

        ctx.status = 200
        ctx.body = {
            message: "Movimiento actualizado correctamente"
        }
        return ctx

    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            message: 'Hubo un problema al procesar los datos del movimiento'
        }
        return ctx
    }
}
