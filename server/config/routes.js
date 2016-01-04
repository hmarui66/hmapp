/**
 * Routes for express app
 */
var articles = require('../controllers/articles');
var users = require('../controllers/users');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var App = require('../../public/assets/app.server');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = function(app, passport) {
  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', ensureAuthenticated, users.postSignUp);
  app.get('/logout', users.getLogout);

  app.get('/article', articles.all);

  app.get('/article/:id', function(req, res) {
    articles.show(req, res);
  });

  app.post('/article', ensureAuthenticated, function(req, res) {
    articles.save(req, res);
  });

  // for server side rendering
  app.get('*', function (req, res, next) {
    App(req, res);
  });

};;
