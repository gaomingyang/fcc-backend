require('dotenv').config()
var bodyParser = require("body-parser");

let express = require('express');
let app = express();

//1.test console output
console.log("Hello World")

//2.Start a Working Express Server

// app.get("/", function(req, res) {
//     res.send("Hello Express");
// });
//ES6语法如下：  
// app.get('/', (req, res) => {
//     res.send('Hello Express')
// })

//因为server里面已经为这个myApp的设置监听了，所以这里不用再listen了
// const port = 3000
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

//the middleware must be mounted before all the routes that depend on it.
// 注意：放在其它路由顶部才有用，如果放在路由最底下，没效果。
//7.Implement a Root-Level Request Logger Middleware
const myLogger = function(req,res,next){
    var logstr = req.method + " " + req.path + " - " + req.ip;
    console.log(logstr)
    next();
}
app.use(myLogger)

//或者这样
// app.use(function(req,res,next){
//     var logstr = req.method + " " + req.path + " - " + req.ip;
//     console.log(logstr)
//     next();
// });

//11.Use body-parser to Parse POST Requests
//依赖body-parser的包已经被安装,在package.json可看到。
app.use(bodyParser.urlencoded({extended: false})) //处理form表单 默认application/x-www-form-urlencoded类别的URL 编码数据。 extended=false 时，它使用经典编码 querystring 库。 当 extended=true时，它使用 qs 库进行解析。
// app.use(bodyParser.json()); //可以处理json post数据


//3.Serve an HTML File
app.get('/', (req, res) => {
    path = __dirname + '/views/index.html'
    res.sendFile(path)
})


//4.Serve Static Assets
// app.use(express.static(__dirname + "/public")); //这样是能实现访问/style.css，访问的是项目目录/public/style.css
app.use("/public", express.static(__dirname + "/public")); // 静态文件/pubic/xxx.css 挂载到/public目录下。这样实现访问/public/style.css访问的是项目目录/public/style.css

//5.Serve JSON on a Specific Route
// app.get('/json',(req,res)=>{
//     data = {"message": "Hello json"}
//     res.json(data)
// });


//6.Use the .env File
app.get('/json',(req,res)=>{
    message = "Hello json"
    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }
    data = {"message": message}
    res.json(data)
});

//8.Chain Middleware to Create a Time Server 通过链式调用中间件来创建时间服务
app.get('/now',function (req,res,next) {
    var t = new Date().toString();
    req.time = t;
    next(); 
},function(req,res){
    res.json({"time":req.time})
});

//9.Get Route Parameter Input from the Client
app.get('/:word/echo',function(req,res){
    let word = req.params.word;
    //或者const { word } = req.params;
    let data = {"echo":word};
    res.json(data)
})

//10.Get Query Parameter Input from the Client
app.get('/name',function(req,res){
    let first = req.query.first
    let last = req.query.last
    let data = {"name" : first + " "+ last};
    res.json(data)

    //或者如下
    /*
    var firstName = req.query.first;
    var lastName = req.query.last;
    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
    name: `${firstName} ${lastName}`
    });
    */
})


//12.Get Data from POST Requests
app.post("/name",function(req,res) {
    let reqdata = req.body
    console.log(reqdata)
    let resdata = {name : reqdata.first + " " + reqdata.last}
    res.json(resdata)
})












 module.exports = app;
