// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

const myLogger = function(req,res,next){
  var logstr = req.method + " " + req.path + " - " + req.ip;
  console.log(logstr)
  next();
}
app.use(myLogger)

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//index page data
app.get('/', (req, res) => {
  let project_url = 'https://boilerplate-project-timestamp.gaomingyangcn.repl.co';

  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 加1是因为月份从0开始，使用padStart来确保两位数字
  let day = String(currentDate.getDate()).padStart(2, '0');

  let date_string = `${year}-${month}-${day}`;

  let timestampMilliseconds = new Date().getTime(); // 获取当前时间戳，以毫秒为单位
  // const timestampSeconds = Math.floor(currentTimestampMilliseconds / 1000); // 转换为秒级的时间戳

  let outputObj = {unix:timestampMilliseconds,utc:currentDate.toUTCString()}
  let output = JSON.stringify(outputObj);


  res.render('index', { project_url: project_url,date_string: date_string,timestampMilliseconds: timestampMilliseconds,output:output })
})

// http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });


app.get("/api/:input",function(req,res){
  var input = req.params.input
  // console.log(typeof input) //都是string，不管是时间戳还是时间字符串，所以无法用typeof是number还是string对比
  var timestamp,utcString

  let errdata = {"error":"Invalid Date"}
  const timestampRegex = /^\d{13}$/ //判断是否是13位的时间戳
  if(timestampRegex.test(input)){
    //如果是时间戳格式
    const parsedTimestamp = parseInt(input, 10);
    if (isNaN(parsedTimestamp)) {
      res.json(errdata);
      return;
    }
    timestamp = parsedTimestamp
    let date = new Date(parsedTimestamp);
    utcString = date.toUTCString();
  } else {
    //不是时间戳格式，按时间字符串处理
    let parsedDate = Date.parse(input);
    if (isNaN(parsedDate)) {
      res.json(errdata);
      return;
    }
    let date = new Date(parsedDate);
    timestamp = date.getTime();
    utcString = date.toUTCString();
  }

  let output = {unix:timestamp,utc:utcString}
  res.json(output)
});

// 处理没有参数的路由
app.get('/api', (req, res) => {
    const date = new Date();
    var timestamp = date.getTime();
    var utcString = date.toUTCString();
    res.json({unix:timestamp,utc:utcString})
});

// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });



// listen for requests :)
var listener = app.listen(process.env.PORT|3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
