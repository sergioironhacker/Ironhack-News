const mongoose = require("mongoose");
const News = require("./News.model");
const User = require("./User.model");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    news: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
