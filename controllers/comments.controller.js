const comment = require('../models/comment.model');

module.exports.doCreate = (req, res, next) => {

    const commentCreate = req.body;
    commentCreate.user = req.session.currentUser._id;
    commentCreate.news = req.params.id;

    comment.create(req.body)
    .then(news =>{
        res.redirect(`/news/${req.params.id}`);
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params;
  
    comment.findByIdAndDelete(id)
      .then((comment) => {
        res.redirect(`/news/${comment.news}`);
      })
      .catch(next)
  }