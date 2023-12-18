const News = require('./News.model')
const mongoose = require('mongoose');
const User = require('./User.model');

const likeSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',


    },
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News',

    }
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like; 