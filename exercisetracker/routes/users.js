const express = require('express');
const router = express.Router();
// const User = require('../models/User')
const path = require('path');
const User = require(path.join(__dirname,'..','/models/User'));

//add a user
router.post('/',async (req,res)=>{
    let { username } = req.body

    //这个demo不用判断重名问题

    console.log(username);
    username = username.trim();
    if(username == ""){
      return res.json({error:"username is required"});
    }

    try {
        const user = new User({ username })
        const savedUser = await user.save();
        //let output = {username:username,_id:xxx}
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

//get users array
router.get('/', async (req,res)=>{
    let users = await User.find();
    res.json(users);
})



module.exports = router;