const mongoose = require("mongoose");
const News = require("./News.model");
const User = require("./User.model");

const ratingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "News",
  },
  score: {
    type: Number,
    min: 1,
    max: 5,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
