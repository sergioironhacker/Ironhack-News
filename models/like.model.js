

const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    
    likes: {
        type: Number,
        default: 0 
    }
});

const like = mongoose.model('like', likeSchema);
module.exports = like;