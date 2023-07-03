import movementActions from '../../actions/movement'

exports.PostMovement = async (ctx)=>{
    console.log(ctx.request.body)
    try{
        await movementActions.PostMovementFromUser(
            ctx.params.id,
            ctx.request.body.mount,
            ctx.request.body.type,
            ctx.request.body.persistent,
            ctx.request.body.date,
            ctx.request.body.description
        ).then(()=>{
            ctx.body = {
                status: 200,
                message: "Movimiento registrado correctamente"
            }
            return ctx
        })
    }catch (e){
        ctx.status = 500
        ctx.body =
            {
                status: 500,
                message: "Hubo un error al procesar los datos, intente nuevamente"
            }
    }
}
