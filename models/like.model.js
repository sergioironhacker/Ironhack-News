const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News',
    }
}, {
    timestamps: true,
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;