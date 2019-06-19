class StationRepo {
    constructor(dbc) {
        this.dbc = dbc
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS "CartStation" (
        "ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
            "Name"	TEXT,
            "TargetState"	NUMERIC,
            "CurrentState"	NUMERIC
            )`
        return this.dbc.run(sql)
    }

    create(name, targetState, currentState) {
        return this.dbc.run(
            `INSERT INTO CartStation (Name, TargetState, CurrentState)
            VALUES (?, ?, ?)`,
            [name, targetState, currentState])
    }

    getAll() {
        return this.dbc.all(`SELECT * FROM CartStation`)
    }

    getById(id) {
        return this.dbc.get(
            `SELECT * FROM CartStation WHERE ID = ?`,
            [id])
    }

    update(id, currentState) {
        return this.dbc.run(
            `UPDATE CartStation SET CurrentState = ? WHERE id = ?`,
            [currentState, id])
    }


}
module.exports = StationRepo;  