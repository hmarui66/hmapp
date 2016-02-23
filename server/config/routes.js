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
    res.status(401).send('Unauthorized');
  }
}

module.exports = function(app, passport) {
  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', ensureAuthenticated, users.postSignUp);
  app.get('/logout', users.getLogout);

  app.get('/article', articles.published);
  app.get('/article/show/:id', function(req, res) {
    articles.show(req, res);
  });
  app.post('/article', ensureAuthenticated, function(req, res) {
    articles.save(req, res);
  });
  app.delete('/article', ensureAuthenticated, articles.delete);
  app.get('/article/categories', articles.categories);
  app.get('/article/tags', articles.tags);
  app.get('/article/drafts', ensureAuthenticated, articles.drafts);

  // for server side rendering
  app.get('*', function (req, res, next) {
    App(req, res);
  });

};;
