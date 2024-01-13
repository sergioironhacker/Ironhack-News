const mongoose = require("mongoose");
const News = require("./News.model");
const User = require("./User.model");

const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    news: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
