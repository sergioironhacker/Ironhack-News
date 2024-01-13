const Rating = require('../models/Rating.model');
const News = require('../models/News.model')
const User = require('../models/User.model')
const mongoose = require('mongoose')

module.exports.doCreateRating = async (req, res) => {
  try {
    const { user, news, score } = req.body;

    const newRating = new Rating({ user, news, score });
    await newRating.save();

    const ratings = await Rating.find({ news });
    const totalScore = ratings.reduce((acc, rating) => acc + rating.score, 0);
    const averageScore = totalScore / ratings.length || 0;
    const percentage = averageScore * 20;

    await News.findByIdAndUpdate(news, { $set: { percentage } });

    res.redirect(`/news/${news}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}