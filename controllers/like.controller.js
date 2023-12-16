
const News = require('../models/News.model');


exports.likeNews = async (req, res, next) => {
    try {
        const newsId = req.params.id;
        
        
        const news = await News.findById(newsId);
        
        
        news.likes += 1;

       
        await news.save();
o
        res.redirect(`/news/${newsId}`);
    } catch (error) {
        console.error('Error al dar like a la noticia:', error);
        res.status(500).send('Error al dar like a la noticia.');
    }
};
