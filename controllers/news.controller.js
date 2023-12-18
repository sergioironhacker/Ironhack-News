const fetch = require('node-fetch');
const apiKey = process.env.NEWS_API_KEY;
const mongoose = require('mongoose');
const News = require('../models/News.model')





// regular news

module.exports.listNews = function (req, res, next) {
  News.find()
    .then(news => res.render("news/news-index", { news }))
    .catch(error => next(error));
}

module.exports.details = (req, res, next) => {
  const { id } = req.params;

  News.findById(id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      }
    })
    
    .then(news => {
      if (news) {
        console.log(news.comments)
        res.render('news/article', news);
      } else {
        res.redirect('/news');
      }
    })
    .catch(next)
}


//API news

exports.getNews = async (req, res) => {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }

    const data = await response.json();
    res.render('news', { articles: data.articles });
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    res.render('news', { articles: [] });
  }
};



// japan news 


exports.getSpainNews = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    const response = await fetch(`https://gnews.io/api/v4/top-headlines?country=jp&token=${apiKey}`);
    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }

    const data = await response.json();
    res.render('japanNews', { articles: data.articles });
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    res.render('japanNews', { articles: [] });
  }
};
