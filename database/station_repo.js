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
}

module.exports = StationRepo;  