const Like = require('../models/Like.model');

module.exports.doCreate = (req, res, next) => {
    const { newsId } = req.params;
    const userId = req.session.currentUser._id;

    Like.findOne({ user: userId, news: newsId })
        .then((like) => {
            if (!like) {
                return Like.create({ user: req.session.currentUser._id, news: newsId })
                    .then((like) => {
                        res.redirect(`/news/${newsId}`)
                    })
            } else {
                return Like.findByIdAndDelete(like._id)
                    .then(() => {
                        res.redirect(`/news/${newsId}`)
                    })
            }
        })
        .catch(next)

}