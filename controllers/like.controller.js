const Likes = require('../models/Like.model');
const News = require('../models/News.model');
const likeHelper = require('../helpers/likeHelper');
const User = require('../models/User.model');



module.exports.likeNews = async (req, res, next) => {
    try {
        const {newsId}  = req.params
        const currentUserId = req.session.currentUser._id
        const currentUser = await User.findById(currentUserId)
        console.log(newsId)
        console.log(currentUser)

        if(currentUser.likedNews.includes(newsId)){
            await User.findByIdAndUpdate(currentUserId, {$pull: {likedNews: newsId}}, {new: true})
            await News.findByIdAndUpdate(newsId, {$pull: {likedBy: currentUserId}}, {new: true})
            const updatedUser = await User.findById(currentUserId)
            req.session = updatedUser

        }else{
            await User.findByIdAndUpdate(currentUserId, {$push: {likedNews: newsId}}, {new: true})
            await News.findByIdAndUpdate(newsId, {$push: {likedBy: currentUserId}}, {new: true})
            const updatedUser = await User.findById(currentUserId)
            req.session = updatedUser


        }
        
    } catch (error) {
        console.log(error)
    }
  


}

