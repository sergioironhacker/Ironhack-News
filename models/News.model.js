const mongoose = require('mongoose')

const NewsSchema = mongoose.Schema ({
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
}, {
    virtual: true,
});

NewsSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "news",
    justOne: false,
  });
  
  const News = mongoose.model("News", NewsSchema);
  module.exports = News;