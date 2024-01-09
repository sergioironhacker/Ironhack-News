/* const Rating = require('../models/rating.model');

module.exports.doCreateRating = (req, res, next) => {
    const { newsId } = req.params;
    const userId = req.session.currentUser._id;

    Rating.findOne({ user: userId, news: newsId })
        .then((rating) => {
            if (!rating) {
                return Rating.create({ user: req.session.currentUser._id, news: newsId, score: req.body.score })
                    .then((newRating) => {
                        res.redirect(`/news/${newsId}`);
                    })
            } else {
                // Actualizar la calificación si el usuario ya había calificado esta noticia
                return Rating.findByIdAndUpdate(rating._id, { score: req.body.score })
                    .then(() => {
                        res.redirect(`/news/${newsId}`);
                    })
            }
        })
        .catch(next);
};
 */