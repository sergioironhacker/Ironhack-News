const User = require('../models/User.model');

module.exports.userlist = function(req, res, next) {
  User.find()
    .then(users => res.render("admin/userlist", { users }))
    .catch(error => next(error));
}


