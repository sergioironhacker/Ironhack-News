const mongoose = require('mongoose');
const News = require('../models/News.model');
const { news } = require('../data/news.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('news')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return News.create(news);
    })
    // buscais las noticoas
    /* const news = []
    let comments = []
    usersDB.forEach(user => {
        news.forEach(piece => {
            const body = {
                user: user.id,
                news: piece.id,
                message: ""
            }
            comments.push(body)
        })
    }) */
    .then((newsDB) => {
        newsDB.forEach(news => console.log(`${news.title} has been created`));
    })
    .catch(err => console.error(err))
    .finally(() => {
      mongoose.connection.close()
      .then(() => {
        console.log('End of seeds');
      })
      .catch((err) => console.error('Error while disconnecting', err))
      .finally(() => process.exit(0))
    })
})