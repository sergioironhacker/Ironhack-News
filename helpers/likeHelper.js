/* const hbs = require('hbs')

hbs.registerPartials('./views/partials')

hbs.registerHelper('likes', function (options) {
    const { news, likes } = options.hash;
    if (news && likes && likes.some(like => like.news == news.id)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }) */