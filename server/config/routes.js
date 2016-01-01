/**
 * Routes for express app
 */
var articles = require('../controllers/articles');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var App = require('../../public/assets/app.server');

module.exports = function(app, passport) {

  app.get('/article', articles.all);

  app.get('/article/:id', function(req, res) {
    articles.show(req, res);
  });

  app.post('/article', function(req, res) {
    articles.save(req, res);
  });

  // for server side rendering
  app.get('*', function (req, res, next) {
    App(req, res);
  });

};;
