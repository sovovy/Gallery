const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const commentSchema = new mongoose.Schema({
    user_id: Number,
    name: String,
    content: String,
    date: String,
    image_no: Number
});

commentSchema.plugin(autoIncrement.plugin, {
    model: 'Comment',
    field: 'no',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Comment', commentSchema);