const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require("../models/User.model");

passport.serializeUser((user, next) => {
  next(null, user);
})

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then((user => next(null, user)))
    .catch(next);
})

passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI || '/auth/google/callback',
}, (accessToken, refreshToken, profile, next) => {
  const googleID = profile.id
  const email = profile.emails[0] ? profile.emails[0].value : undefined;
  const username = profile.displayName;
  const picture = profile.photos[0] ? profile.photos[0].value : undefined;

  if (googleID && email) {
    User.findOne({ $or: [
      { email: email },
      { googleID: googleID }
    ]})
    .then(user => {
      if (!user) {
        const newUserInstance = new User({
          email,
          username,
          picture,
          password: new mongoose.Types.ObjectId(),
          googleID: googleID,
          isActive: true
        })

        return newUserInstance.save()
          .then(newUser => next(null, newUser))
      } else {
        next(null, user);
      }
    })
    .catch((err) => {
      next(err);
    })
  } else {
    next(null, null, { error: 'Error connecting with Google OAuth' });
  }
}))
