class VoucherRepo {
    constructor(dbc) {
        this.dbc = dbc
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS "Voucher" (
        "VoucherID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "Name"	TEXT,
            "Description"	TEXT)`

        return this.dbc.run(sql)
    }

    create(name, decription) {
        return this.dbc.run(
            `INSERT INTO Voucher (Name, Description)
            VALUES (?, ?)`,
            [name, decription])
    }


    getAll() {
        return this.dbc.all(`SELECT * FROM Voucher`)
    }


}

module.exports = VoucherRepo;  