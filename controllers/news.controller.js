const fetch = require('node-fetch');
const apiKey = process.env.NEWS_API_KEY;

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