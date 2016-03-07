/**
 * Routes for express app
 */
var articles = require('../controllers/articles');
var users = require('../controllers/users');
var healthgraph = require('../controllers/healthgraph');
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
  app.post('/auth/login', users.postLogin);
  app.post('/auth/signup', ensureAuthenticated, users.postSignUp);
  app.get('/auth/logout', users.getLogout);

  app.get('/auth/healthgraph', healthgraph.authorize);
  app.get('/auth/healthgraph/callback', healthgraph.callback);

  app.get('/api/article', articles.published);
  app.get('/api/article/show/:id', function(req, res) {
    articles.show(req, res);
  });
  app.post('/api/article', ensureAuthenticated, function(req, res) {
    articles.save(req, res);
  });
  app.delete('/api/article', ensureAuthenticated, articles.delete);
  app.get('/api/article/categories', articles.published);
  app.get('/api/article/categories/:category', articles.category);
  app.get('/api/article/tags', articles.published);
  app.get('/api/article/tags/:tag', articles.tag);
  app.get('/api/article/drafts', ensureAuthenticated, articles.drafts);

  app.get('/api/categories', articles.categories);
  app.get('/api/tags', articles.tags);

  // for server side rendering
  app.get('*', function (req, res, next) {
    App(req, res);
  });

};;
