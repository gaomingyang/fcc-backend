// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

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


app.get("/api/:timestr",function(req,res){
  var timestr = req.params.timestr
  var timestamp,utcString

  if (/^\d+$/.test(timestr)) {
    //传入纯数字，是时间戳，Date解析这个需要用整型
    timestamp=parseInt(timestr, 10);
    utcString = new Date(timestamp).toUTCString();
  }else{
    //传入是时间字符串，直接解析字符串
    timestamp = new Date(timestr).getTime();
    utcString = new Date(timestamp).toUTCString();
  }

  let output = {unix:timestamp,utc:utcString}
  res.json(output)
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT|3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
