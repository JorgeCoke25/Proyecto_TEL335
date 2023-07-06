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
exports.GetBudgets = async (ctx) => {
    try {
        const [budgets] = await budgetActions.GetBudgetsFromUser(ctx.params.id)
        ctx.status = 200
        ctx.body = budgets
        return ctx

    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            message: 'Hubo un problema al procesar los datos del los movimientos'
        }
        return ctx
    }
}
