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

    update(action){
        if (action == "inc") {
            return this.dbc.run(
                `UPDATE CartStation SET CurrentState = ?`,
                [this.dbc.currentState + 1])
        }
        
        else if(action = "dec") {
            return this.dbc.run(
                `UPDATE CartStation SET CurrentState = ?`,
                [this.dbc.currentState - 1])
            
        }
        
    }


}

module.exports = StationRepo;  