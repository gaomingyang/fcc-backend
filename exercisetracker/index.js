const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

var bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

app.set('view engine', 'ejs');

app.use(cors())
const myLogger = function(req,res,next){
  var logstr = req.method + " " + req.path + " - " + req.ip;
  console.log(logstr)
  next();
}
app.use(myLogger)

// 使用 body-parser 中间件来解析 POST 请求的数据
app.use(bodyParser.urlencoded({extended: false}))



app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html')
// });

app.get('/', (req, res) => {
  let base_url = process.env.BASE_URL;
  res.render('index', { base_url : base_url});
});




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
