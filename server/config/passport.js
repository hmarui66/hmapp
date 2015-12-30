/* Initializing passport.js */
var User = require('../models/user');
var local = require('./passport/local');

/*
 * Expose
 */
module.exports = function(app, passport, config) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    console.log('serialize')
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser')
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //use the following strategies
  passport.use(local);
};