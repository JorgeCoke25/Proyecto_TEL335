const {getConnection} = require("../db_connection");
exports.PostBudgetFromUser = async (id, date, salary, basicBills, food, transport, entertainment, other) => {
    const connection = await getConnection()
    try {
        await connection.execute(
            'INSERT INTO budget (date,salary,basicBills,food,transport,entertainment,other,id_user) VALUES (?, ?, ?, ?, ?, ?, ?,? )',
            [date, salary, basicBills, food, transport, entertainment, other, id])
        connection.release()
        return true
    } catch (e) {
        console.log(e)
        connection.release()
    }
}

exports.GetBudgetsFromUser = async (id) => {
    const connection = await getConnection()
    try {
        const budgets = connection.execute(
            'SELECT * from budget WHERE id_user = ? ORDER BY date ASC',
            [id]
        ).catch(e => {
            console.log(e)
        })
        connection.release()
        return budgets;
    } catch (e) {
        console.log(e)
        connection.release()
    }

}
