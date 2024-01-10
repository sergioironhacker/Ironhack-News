const User = require("../models/User.model");
const News = require("../models/News.model");

module.exports.index = function (req, res, next) {
  let newsPromise = News.find().sort({ timestamp: 1 }); 
  let usersPromise = User.find().sort({ timestamp: 1 });



  Promise.all([newsPromise, usersPromise])
    .then(([news, users]) => {
      res.render("admin/index", { news, users });
    })
    .catch((error) => next(error));
};

module.exports.userlist = function (req, res, next) {
  User.find()
    .then((users) => res.render("admin/userlist", { users }))
    .catch((error) => next(error));
};

module.exports.newslist = function (req, res, next) {
  News.find()
    .then((news) => res.render("admin/newslist", { news }))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  News.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/admin/newslist");
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;

  News.findById(id)
    .then((news) => {
      res.render("admin/news-form", { news });
    })
    .catch(next);
};

module.exports.doUpdate = (req, res, next) => {
  const { id } = req.params;
  if (req.file) {
    req.body.image = req.file.path;
  }

  News.findByIdAndUpdate(id, req.body, { new: true })
    .then((news) => {
      res.redirect(`/news/${news._id}`);
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  res.render("admin/news-form");
};

module.exports.doCreate = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }

  News.create(req.body)
    .then((news) => {
      res.redirect(`/news/${news._id}`);
    })
    .catch(next);
};
