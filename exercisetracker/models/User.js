const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
},{
    // versionKey: false // 禁用版本键，即不包括 __v 字段
  });

module.exports = mongoose.model('User', userSchema);