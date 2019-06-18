class QrCodeRepo {
    constructor(dbc) {
        this.dbc = dbc
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS "QrCode" (
          "ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          "VoucherID"	INTEGER,
          "Daytime-Active"	INTEGER,
          "Daytime-Pending"	INTEGER,
          "Daytime-Over"	INTEGER,
          "StationID"	INTEGER,
          "Status"	INTEGER
    )`
        
        return this.dbc.run(sql)
    }

    create(voucherId, stationId) {
        return this.dbc.run(
            `INSERT INTO QRCode (VoucherID, Daytime-Pending, StationID, Status)
            VALUES (?, ?, ?, ?)`,
            [voucherId, Date.now(), stationId, 0])
    }

    update(qrCodeId, status) {
        if (status == 1) {
            return this.dbc.run(
                `UPDATE QRCode SET status = ?, Daytime-Active = ? WHERE id = ?`,
                [status, Date.now(), qrCodeId]
            )
        }
        else if (status == 2) {
            return this.dbc.run(
                `UPDATE QRCode SET status = ?, Daytime-Over = ? WHERE id = ?`,
                [status, Date.now(), qrCodeId]
            )
        }
    }


    getById(id) {
        return this.dbc.get(
            `SELECT * FROM QRCode WHERE id = ?`,
            [id])
    }

    getByStatus(status) {
        return this.dbc.get(
            `SELECT * FROM QRCode WHERE Status = ?`,
            [status])
    }

    getAll() {
        return this.dao.all(`SELECT * FROM QRCode`)
    }
}

module.exports = QrCodeRepo;  