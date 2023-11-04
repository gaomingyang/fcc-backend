const mongoose = require('mongoose');

const exerciseLogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: String,
    duration: Number,
    date: Date,
},{
    // versionKey: false // 禁用版本键，即不包括 __v 字段
  });

module.exports = mongoose.model('ExerciseLog',exerciseLogSchema);