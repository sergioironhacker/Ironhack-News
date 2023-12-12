

module.exports.profile = (req, res, next) => {
    const currentUser = req.session.currentUser; 
   
    if (currentUser) {
      res.render('users/profile', { currentUser }); 
      console.log('currentUser:', currentUser);
    } else {
      res.redirect('/login'); 
    }
  };
  