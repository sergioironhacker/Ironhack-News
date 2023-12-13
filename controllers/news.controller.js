const fetch = require('node-fetch');
const apiKey = process.env.NEWS_API_KEY;
const mongoose = require('mongoose');
const News = require('../models/News.model')

// regular news

module.exports.listNews = function(req, res, next) {
  News.find()
    .then(news => res.render("news/news-index", { news }))
    .catch(error => next(error));
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