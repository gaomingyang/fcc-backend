var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

var app = express();

app.set('view engine', 'ejs');


// 配置Multer中间件
// 这是用本地存储
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // 上传文件保存的目录
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // 上传文件的新文件名
//   },
// });

const storage = multer.memoryStorage();//内存存储
const upload = multer({ storage: storage });

app.use(express.json()); //解析json请求体
app.use(express.urlencoded({extended:true}))//解析url编码请求体

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// app.get('/', function (req, res) {
//   res.sendFile(process.cwd() + '/views/index.html');
// });
app.get('/', (req, res) => {
  res.render('index');
});

//接收文件上传
app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  if(!req.file){
    return res.status(400).json({error:"no file!"});
  }

  const fileinfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  }
  res.json(fileinfo);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
