const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./IoTDB.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the IoT database.');
});
 
db.serialize(() => {
  db.each(`SELECT ID as id, 
			Name as name
           FROM CartStation`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});
 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});