// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

const myLogger = function(req,res,next){
  var logstr = req.method + " " + req.path + " - " + req.ip;
  console.log(logstr)
  next();
}
app.use(myLogger)

//使用模板引擎ejs
app.set('view engine', 'ejs');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get('/', (req, res) => {
  output = {
    ipaddress: req.ip,
    language: req.headers['accept-language'],
    software: req.headers["user-agent"]
  }
  let code = JSON.stringify(output);
  let base_url = process.env.BASE_URL;
  res.render('index', { code: code, base_url : base_url});
});

app.get('/api/whoami',function(req,res){
  // console.log(req)
  // console.log("-----")
  // console.log(req.headers)
  output = {
    ipaddress: req.ip,
    language: req.headers['accept-language'],
    software: req.headers["user-agent"]
  }
  res.json(output)
});


// http://expressjs.com/en/starter/basic-routing.html
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

// your first API endpoint...
// app.get('/api/hello', function (req, res) {
//   res.json({ greeting: 'hello API' });
// });

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
