const hbs = require('hbs')

hbs.registerHelper('newsIsLikedByUser', function (options) {
  const { likes, userId } = options.hash;
  if (userId && likes && likes.some(like => like.user == userId)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}) 