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


}

module.exports = StationRepo;  