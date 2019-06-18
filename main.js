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


      //Real strings or our IoT Hackathon use.

      app.get('/v1/cart', function (req, res) {
         console.log("Got a GET request for CARTS");
         res.send('All Information of Carts')
      })

      app.get('/v1/action/:device', function (req, res) {
         console.log("Got a GET request for Action");
         var device = req.params.device;
         stationRepo.getAll().then((stations) => {
            console.log(stations);
            var resPlayload = {
               result: 0
            }
            stations.forEach((station) => {
               var diff = station.TargetState - station.CurrentState;
               if (Math.abs(diff) < 5) {

               } else if (diff <= -5 && device == "smartphone") {
                  resPlayload = {
                     result: 1,
                     stationId: station.ID,
                     stationName: station.Name,
                  }
               } else if (device == "kasse") {
                  resPlayload = {
                     result: 2,
                     stationId: station.ID,
                     stationName: station.Name,
                  }
               }
            })
            console.log(resPlayload);
            res.status(200).json(resPlayload);

         }).catch(
            (err) => {
               console.log(err);
            }
         )


      })

      app.post('/v1/qrcode', function (req, res) {
         console.log(req.body)
         var stationId = req.body.stationId;
         voucherRepo.getAll().then(
            (data) => {
               console.log(data)
               var length = Object.keys(data).length
               var randomVoucherId = Math.floor(Math.random() * length + 1);
               var voucherName;
               var voucherDesc;
               data.forEach((voucher) => {
                  if (voucher.VoucherID == randomVoucherId) {
                     voucherName = voucher.Name;

                     voucherDesc = voucher.Description;
                  }
               });
               console.log("Random number: " + randomVoucherId)
               qrCodeRepo.create(randomVoucherId, stationId).then(
                  (data) => {
                     console.log(data.id)
                     res.status(200).json({
                        result: "Erfolgreich",
                        id: data.id,
                        voucherName: voucherName,
                        voucherDesc: voucherDesc,
                        isActive: 0
                     })
                     return;
                  }
               )
            }
         )
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




      app.put('/v1/cart/:action', function (req, res) {

         console.log(req.body.StationID)
         stationRepo.getById(req.body.StationID).then(
            station => {
               console.log(station)
               station.update(req.params.action)
            })



      })





      var server = app.listen(8082, function () {
         var host = server.address().address
         var port = server.address().port

         console.log("Example app listening at http://%s:%s", host, port)
      })





   })

// Needed for initializing


