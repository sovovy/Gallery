const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const imageSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    user_id: { type: Number },
    date: { type: String },
    file_name: { type: String },
    frame_num: { type: Number },
    views: { type: Number },
    comment_num: { type: Number, default: 0 }
});

imageSchema.plugin(autoIncrement.plugin, {
    model: 'Image',
    field: 'no',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Image', imageSchema);