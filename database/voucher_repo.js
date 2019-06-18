class VoucherRepo {
    constructor(dbc) {
        this.dbc = dbc
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS "Voucher" (
        "VoucherID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "Name"	TEXT,
            "Description"	INTEGER)`

        return this.dbc.run(sql)
    }
}

module.exports = VoucherRepo;  