const express = require('express');
const router = express.Router();
// const ExerciseLog = require('../models/Exerciselog');
// const User = require('../models/User')


const path = require('path');
const ExerciseLog = require(path.join(__dirname,'..','/models/Exerciselog'));
const User = require(path.join(__dirname,'..','/models/User'));

// add an exercise log
router.post('/:_id/exercises', async (req,res) => {
    user_id = req.params._id;
    let {description,duration,date} = req.body;

    var user;
    try {
        user = await User.findById(user_id);
    }catch(err) {
        return res.json({error:"user_id doesn't exist!"});
    }

    if(date == ""|| date== undefined) {
        let d = new Date()
        let month = String(d.getMonth() + 1).padStart(2, '0')
        let day = String(d.getDate()).padStart(2, '0');
        date = d.getFullYear() + " "+ month + " "+ day;
    }

    console.log(user_id)
    console.log(req.body)

    const log = new ExerciseLog({
        user_id:user_id,
        description:description,
        duration: Number(duration),
        date: date
    });

    try{
        const savedLog = await log.save();
        console.log(savedLog)
        let output = {
            _id: user_id,
            username: user.username,
            description:description,
            duration:Number(duration),
            date:new Date(date).toDateString(),
        }
        res.json(output);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});


//retrieve logs of one user.
router.get('/:_id/logs',async (req,res)=>{
    let user_id = req.params._id;
    let {from,to,limit} = req.query;
    
    //先判断用户是否存在
    var user;
    try {
        user = await User.findById(user_id);
    }catch(err) {
        return res.json({error:"user_id doesn't exist!"});
    }

    //get logs
    try{
        let query = ExerciseLog.find({user_id:user_id});

        if(from && to ) {
            query.where('date').gte(from).lte(to);
        }else if (from) {
            query.where('date').gte(from);
        }else if (to) {
            query.where('date').lte(to);
        }
        
        if (limit){
            query.limit(limit);
        }

        let logs = await query.exec();

        var outlogs = []
        logs.forEach(function(d){
            let datestr = new Date(d.date).toDateString()
            // console.log("时间处理",d.date, datestr);
            outlogs.push({description:d.description,duration:d.duration,date:datestr})
        })

        
        let result = {
            _id: user_id,
            username:user.username,
            count: outlogs.length,
            log: outlogs
        }
        res.json(result);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
});

module.exports = router;