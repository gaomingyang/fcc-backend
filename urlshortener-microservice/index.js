require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

const myLogger = function(req,res,next){
  var logstr = req.method + " " + req.path + " - " + req.ip;
  console.log(logstr)
  next();
}
app.use(myLogger)

// 使用 body-parser 中间件来解析 POST 请求的数据
app.use(bodyParser.urlencoded({extended: false})) //处理form表单 默认application/x-www-form-urlencoded类别的URL 编码数据。 extended=false 时，它使用经典编码 querystring 库。 当 extended=true时，它使用 qs 库进行解析。

//短链接model
const ShortURL = mongoose.model('ShortURL',new mongoose.Schema({
  _id:Number,
  longURL:String
}));


// 自定义中间件来验证 URL 参数
function validateURL(req, res, next) {
  const url = req.body.url; // 假设请求的参数名为 "url"
  if (!url) {
    return res.status(400).json({ error: 'please input valid url'});
  }

  // 定义 URL 的正则表达式
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (urlRegex.test(url)) {
    // URL 合法，继续处理
    next();
  } else {
    // URL 不合法，返回错误响应
    res.status(400).send('invalid url');
  }
}


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  let base_url = process.env.BASE_URL;
  res.render('index', { code: code, base_url : base_url});
});

app.post('/api/shorturl',validateURL,(req,res)=>{
  let url = req.body.url;
  console.log("get url:",url)
  
  //先查询是否存在

  

  //不存在，则创建
  // 获取下一个可用的数字 ID
  const nextId =  ShortURL.countDocuments() + 1;
  const item = new ShortURL({_id:nextId,longURL:url})
  item.save().then()
  
  output = {original_url:url,short_url:123}
  res.json(output);
  // res.send('URL is valid');
})


app.get('/api/shorturl/:id',function(req,res){
  let id = req.params.id
  //空值判断
  if (!id){
    return res.send('No shortid');
  }
  //格式判断
  const idRegex = /^\d+$/
  if(!idRegex.test(id)){
    return res.json({error:"Wrong format"});
  }
  //查询
  //如果找不到
  
  //如果找到了，直接跳转过去

});

// app.get('/', function(req, res) {
//   res.sendFile(process.cwd() + '/views/index.html');
// });

// Your first API endpoint
// app.get('/api/hello', function(req, res) {
//   res.json({ greeting: 'hello API' });
// });

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
