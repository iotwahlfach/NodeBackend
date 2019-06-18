class StationRepo {
    constructor(dbc) {
        this.dbc = dbc
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT)`
        return this.dbc.run(sql)
    }
}

module.exports = StationRepo;  