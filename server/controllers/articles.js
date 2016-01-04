var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');
var Article = mongoose.model('Article');


/**
 * List
 */
exports.all = function(req, res) {
  Article.find({}).sort({ createdAt: 'desc'}).exec(function(err, articles) {
    if(!err) {
      res.json(articles);
    }else {
      console.log('Error in first query');
    }
  });
};

/**
 * Show
 */
exports.show = function(req, res) {
  Article.findOne({ id: req.params.id }).exec(function(err, article) {
    if(!err) {
      res.json(article);
    }else {
      console.log('Error in query');
    }
  });
};

/**
 * Save an article
 */
exports.save = function(req, res) {
  var data = req.body;
  if (data.id) {
    var query = { id: req.body.id };
    var omitKeys = ['id', '_id', '_v'];
    data = _.omit(data, omitKeys);
    Article.findOneAndUpdate(query, data, function(err, data) {
      if(err) {
        console.log('Error on save!');
        res.status(500).send('We failed to save to due some reason');
      }
      res.status(200).send('Updated successfully');
    });
  } else {
    data = _.set(data, 'id', moment().format('x'));
    Article.create(data, function (err) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send('Added successfully');
    });
  }

};
