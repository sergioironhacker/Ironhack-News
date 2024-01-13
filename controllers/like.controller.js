const Like = require("../models/Like.model");
const User = require("../models/User.model");

module.exports.doCreate = (req, res, next) => {
  const { newsId } = req.params;
  const userId = req.session.currentUser._id;

  Like.findOne({ user: userId, news: newsId })
    .then((like) => {
      if (!like) {
        return Like.create({
          user: req.session.currentUser._id,
          news: newsId,
        }).then(() => {
          // Update the likedNews array in the User model
          return User.findByIdAndUpdate(
            userId,
            { $push: { likedNews: newsId } },
            { new: true }
          ).then(() => res.redirect(`/news/${newsId}`));
        });
      } else {
        return Like.findByIdAndDelete(like._id).then(() => {
          // Update the likedNews array in the User model
          return User.findByIdAndUpdate(
            userId,
            { $pull: { likedNews: newsId } },
            { new: true }
          ).then(() => res.redirect(`/news/${newsId}`));
        });
      }
    })
    .catch(next);
};
