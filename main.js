const DatabaseConnector = require('./database/database_connector');
const QrCodeRepo = require('./database/qrcode_repo');
const StationRepo = require('./database/station_repo');
const VoucherRepo = require('./database/voucher_repo');
var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const database = new DatabaseConnector('./database/IoTDB2.db')
const qrCodeRepo = new QrCodeRepo(database);
const stationRepo = new StationRepo(database);
const voucherRepo = new VoucherRepo(database);
qrCodeRepo.createTable().then(
   () => stationRepo.createTable())
   .then(() => voucherRepo.createTable())
   .then(() => {
      // stationRepo.create("Parkdeck", 50, 70).then(
      //    () => stationRepo.create("Eingang Straße", 50, 20))

      // voucherRepo.create("Fleischgutschein", "10% Rabatt beim nächsten Einkauf bei der Fleischtheke")
      // voucherRepo.create("Obstgutschein", "10% Rabatt beim nächsten Einkauf bei der Obsttheke")
      // voucherRepo.create("Gemüsegutschein", "10% Rabatt beim nächsten Einkauf bei der Gemüstheke")
      console.log("Database setup successfully");



      // 2 Examples 1 GET and 1 POST
      // This responds with "Hello World" on the homepage
      app.get('/', function (req, res) {
         console.log("Got a GET request for the homepage");
         res.send('Hello GET');
      })

      // This responds a POST request for the homepage
      app.post('/', function (req, res) {
         console.log("Got a POST request for the homepage");
         res.send('Hello POST');
      })

      //Real strings or our IoT Hackathon use.

      app.get('/v1/cart', function (req, res) {
         console.log("Got a GET request for CARTS");
         res.send('All Information of Carts')
      })

      app.get('/v1/action', function (req, res) {
         console.log("Got a GET request for Action");
         res.send('All Information of Action')
      })

      app.post('/v1/qrcode', function (req, res) {
         console.log(req.body)
         var stationId = req.body.stationId;
         voucherRepo.getAll().then(
            (data) => {
               console.log(data)
               var length = Object.keys(data).length
               var randomVoucherId = Math.floor(Math.random() * length + 1);
               console.log("Random number: " + randomVoucherId)
               qrCodeRepo.create(randomVoucherId, stationId).then(
                  (data) => {
                     console.log(data)
                  }
               )
            }
         )
         res.send("o");
      });

      app.put('/v1/qrcode', function (req, res) {
         console.log(req.body);
         var qrCodeId = req.body.qrCodeId;
         var status = req.body.status;
         var stationId = req.body.stationId;
         qrCodeRepo.getById(qrCodeId).then(
            data => {
               console.log(data)
               if (!data) {
                  res.status(401).json({
                     result: "Fehlgeschlagen",
                     message: "QR Code existiert nicht!"
                  })
                  return;
               }
               if (data.stationId != stationId) {
                  res.status(404).json({
                     result: "Fehlgeschlagen",
                     message: "QR Code ist nicht auf diese Station registriert!"
                  })
               }
               qrCodeRepo.update(qrCodeId, status).then(
                  (data) => {

                     res.status(200).json({
                        result: "Erfolgreich",
                        message: "QR Code wurde erfolgreich aktiviert!"
                     })
                  }
               ).catch(
                  (err) => {
                     console.log(err);
                     res.status(500).json({
                        result: "Fehlgeschlagen",
                        message: "Ein interner Fehler ist aufgetreten!"
                     })
                  }
               )
            }
         ).catch(
            (err) => {
               res.status(500).json({
                  result: "Fehlgeschlagen",
                  message: "Ein interner Fehler ist aufgetreten!"
               })
            }
         )
      })










      var server = app.listen(8081, function () {
         var host = server.address().address
         var port = server.address().port

         console.log("Example app listening at http://%s:%s", host, port)
      })



























   })

// Needed for initializing


