const DatabaseConnector = require('./database/database_connector');
const QrCodeRepo = require('./database/qrcode_repo');
const StationRepo = require('./database/station_repo');
const VoucherRepo = require('./database/voucher_repo');
var express = require('express');
var app = express();


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

         stationRepo.getAll().then((stations) => {
            console.log(stations);
            var resPlayload = {
               result: 0
            }
            stations.forEach((station) => {
               var diff = station.TargetState - station.CurrentState;
               if(Math.abs(diff) < 5) {
                  
               } else if(diff <= -5) {
                  resPlayload = {
                     result: 1,
                     stationId: station.ID,
                     stationName: station.Name,
                     type: 0
                  }
               } else {
                  resPlayload = {
                     result: 1,
                     stationId: station.ID,
                     stationName: station.Name,
                     type: 1
                  }
               }
            })
            console.log(resPlayload);
            res.status(200).json(resPlayload)




   
          })


//
//         var JSON_response = {
//            'result' : ,
//            'station' : ,
//            'stationName' : ,
//            'type' : 0,

        // }

         



         res.send('All Information of Action')
      })










      var server = app.listen(8081, function () {
         var host = server.address().address
         var port = server.address().port

         console.log("Example app listening at http://%s:%s", host, port)
      })



























   })

// Needed for initializing


