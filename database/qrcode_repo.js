class QrCodeRepo {
    constructor(dbc) {
        this.dbc = dbc
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS "QrCode" (
          "ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          "VoucherID"	INTEGER,
          "activeDate"	INTEGER,
          "creationDate"	INTEGER,
          "overDate"	INTEGER,
          "StationID"	INTEGER,
          "Status"	INTEGER
    )`

        return this.dbc.run(sql)
    }

    create(voucherId, stationId) {
        console.log(voucherId);
        console.log(stationId)
        var datetime = Date.now();
        console.log(datetime);
        return this.dbc.run(
            `INSERT INTO QrCode (VoucherID, creationDate, StationID, Status)
            VALUES (?, ?, ?, ?)`,
            [voucherId, datetime, stationId, 0])
    }

    update(qrCodeId, status) {
        if (status == 1) {
            return this.dbc.run(
                `UPDATE QRCode SET status = ?, activeDate = ? WHERE id = ?`,
                [status, Date.now(), qrCodeId]
            )
        }
        else if (status == 2) {
            return this.dbc.run(
                `UPDATE QRCode SET status = ?, overDate = ? WHERE id = ?`,
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
        return this.dbc.all(`SELECT * FROM QRCode`)
    }
}

module.exports = QrCodeRepo;  