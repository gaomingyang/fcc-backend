# MongoDB and Mongoose Challenges

This is the boilerplate for the MongoDB and Mongoose lessons. Instructions for completing these lessons start at https://www.freecodecamp.org/learn/apis-and-microservices/mongodb-and-mongoose/


## run
```
npm install
```

## MongoDB Atlas

https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/

MongoDB Atlas是MongoDB提供的云托管数据库服务，它允许开发者轻松地部署、管理和扩展MongoDB数据库实例，而无需自行设置和维护物理硬件或虚拟服务器。
MongoDB Atlas is a MongoDB Database-as-a-Service platform, which means that they configure and host the database for you. 

配置.env MONGO_URI='xx'. 注意等号两侧不要有空格


[Introduction to Mongoose for MongoDB
](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)

demo
```
UserModel.find()               // find all users
  .skip(100)                   // skip the first 100 items
  .limit(10)                   // limit to 10 items
  .sort({ firstName: 1 })      // sort ascending by firstName
  .select({ firstName: true }) // select firstName only
  .exec()                      // execute the query
  .then((docs) => {
    console.log(docs);
  })
  .catch((err) => {
    console.error(err);
  });
```
if don't use `then`, could insert callback function in exec. example: `exec((err,res)=>{});`

mongoose
https://mongoosejs.com/docs/

