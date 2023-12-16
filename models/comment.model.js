const mongoose = require('mongoose');
const News = require('./News.model');

const commentSchema = mongoose.Schema({
    content : {
        type: String,
        required: true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true,
    },
    news : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News',
        required: true,
    },
});

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;





