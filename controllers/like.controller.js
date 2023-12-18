const Likes = require('../models/Like.model');
const News = require('../models/News.model');
const likeHelper = require('../helpers/likeHelper')

module.exports.likeNews = (req, res, next) => {
    const newsId = req.params.newsId;
    const currentUser = req.session.currentUser._id;
    console.log(newsId, currentUser)

    Likes.findOne({ user: currentUser, news: newsId })
        .then(existingLike => {
            if (existingLike) {
                // Si el like ya existe, eliminarlo
                return Likes.findByIdAndDelete(existingLike._id)
                    .then(() => {
                        res.json({ liked: false });
                    })
            } else {
                // Si no existe, crear un nuevo like
                return Likes.create({ user: currentUser, news: newsId })
                    .then(() => {
                        res.json({ liked: true });
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};


module.exports.likeNews = async (req, res, next) => {
    try {
      const newsId = req.params.newsId;
      const currentUser = req.session.currentUser._id;
  
      const result = await likes.toggleLike(currentUser, newsId);
  
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al manejar el like' });
    }
  };


