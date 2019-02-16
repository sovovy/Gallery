const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: Number,
  name: String,
  id: String,
  pwd: String,
  writed: Array
});

module.exports = mongoose.model('User', UserSchema);