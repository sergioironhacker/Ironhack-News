
const News = require('../models/News.model');


exports.likeNews = async (req, res, next) => {
    try {
        const newsId = req.params.id;
        const news = await News.findById(newsId);

        // Cambiar el estado del like
        news.likes = !news.likes; // Cambia el estado opuesto (si está en true, se vuelve false y viceversa)

        await news.save();

        res.redirect(`/news/${newsId}`);
    } catch (error) {
        console.error('Error al dar/quitar like a la noticia:', error);
        res.status(500).send('Error al dar/quitar like a la noticia.');
    }
};