var express = require('express');
var app = express();


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










var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})