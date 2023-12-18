const News = require('./News.model')
const mongoose = require('mongoose');
const User = require('./User.model');

const likeSchema = mongoose.Schema({
    
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
        
    },
    News : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News',
        
    }
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like; 