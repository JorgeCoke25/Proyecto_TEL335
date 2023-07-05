const budgetActions = require("../../actions/budget");
exports.PostBudget = async (ctx) => {
    try {
        await budgetActions.PostBudgetFromUser(
            ctx.params.id_user,
            ctx.request.body.date,
            ctx.request.body.salary,
            ctx.request.body.basicBills,
            ctx.request.body.food,
            ctx.request.body.transport,
            ctx.request.body.entertainment,
            ctx.request.body.other
        ).then(() => {
            ctx.body = {
                status: 200,
                message: "Presupuesto registrado correctamente"
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
