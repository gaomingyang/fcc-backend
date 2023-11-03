require('dotenv').config();

//1.Install and Set Up Mongoose
const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//2.Create a Model
var personSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  age: Number,
  favoriteFoods:[String]
})

var Person = mongoose.model('Person',personSchema);


//3.Create and Save a Record of a Model

const createAndSavePerson = (done) => {
  let person = new Person({
    name:"Tom",
    age:18,
    favoriteFoods: ["apple", "banana"]
  });
  // p.save()
  // .then((doc)=>{
  //   console.log(doc)
  // })
  // .catch((err)=>{
  //   console.error(err)
  // })

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
  
  // done(null /*, data*/);
};

//4.Create Many Records with model.create()
var arrayOfPeople = [
  {name: "a", age: 11, favoriteFoods: ["apple"]},
  {name: "b", age: 12, favoriteFoods: ["grape"]},
  {name: "c", age: 13, favoriteFoods: ["rolls"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  // done(null /*, data*/);
  Person.create(arrayOfPeople,function(err,res){
    if (err) return console.log(err);
    done(res);
  })
};


//5.Use model.find() to Search Your Database

const findPeopleByName = (personName, done) => {
  // done(null /*, data*/);
  Person.find({name:personName},function(err,result){
    if (err) return console.log(err);
    done(null,result);
  })
};

// 6. Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  // done(null /*, data*/);
  Person.findOne({favoriteFoods:food},function(err,result){
    if (err) return console.log(err);
    done(null,result);
  })
};

//7. Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  // done(null /*, data*/);
  Person.findById(personId,function(err,result) {
    if(err) return console.log(err);
    done(null,result);
  })
};

//8.Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,person)=>{
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);

    person.save((err,result)=>{
      if(err) return console.log(err);
      done(null,result);
    })
  })
};

//9.Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // done(null /*, data*/);

  //查找并更新的方法，第一个是查找条件，第二个是更新内容，要返回完整内容，需要加上{new: true}，然后再加上callback方法
  Person.findOneAndUpdate({name:personName},{age:ageToSet}, {new: true},function(err,updatedPerson){
    if(err) return console.log(err);
    done(null,updatedPerson);
  })
};


//10.Delete One Document by findByIdAndRemove() or findOneAndRemove()
const removeById = (personId, done) => {
  // done(null /*, data*/);
  Person.findByIdAndRemove(personId,(err,removedDoc)=>{
    if(err) return console.log(err);
    done(null,removedDoc);
  })
};

//11.Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  // done(null /*, data*/);
  Person.remove({name:nameToRemove},function(err,response){
    if(err) return console.log(err);
    done(null,response);
  })
};

//Chain Search Query Helpers to Narrow Search Results
//如果不给 Model.find()（或者别的搜索方法）的最后一个参数传入回调函数, 查询将不会执行。会等到调用 .exec() 方法时才执行。这种情况，也需要在调用链最后传入回调函数。
const queryChain = (done) => {
  const foodToSearch = "burrito";
  // done(null /*, data*/);
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec(function(err,result){
    if(err) return console.error(err);
    done(null,result);
  });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
