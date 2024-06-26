const mongoose = require("mongoose");
const User = require("./User.model");

const NewsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    newsContent: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      default: 0,
    },
  },
  {
    virtual: true,
  },
  {
    timestamps: true,
  }
);

NewsSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "news",
  justOne: false,
});

NewsSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "news",
  justOne: false,
});

NewsSchema.virtual("rating", {
  ref: "Rating",
  localField: "_id",
  foreignField: "news",
  justOne: false,
});

const News = mongoose.model("News", NewsSchema);
module.exports = News;
