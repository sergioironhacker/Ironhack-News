const Likes = require('../models/Like.model')
const News = require('../models/News.model');


exports.likeNews = async (req, res, next) => {
    try {
        const newsId = req.params.newsId;
        const currentUser = req.session._id

    } catch (error) {

    }
};