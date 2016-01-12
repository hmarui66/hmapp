var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');
var Article = mongoose.model('Article');

const paginateOptions = {
  sort: { createdAt: 'desc' },
  limit: 10
};

/**
 * List
 */
exports.all = function(req, res) {
  loadList(req, res, {});
};

exports.published = function(req, res) {
  loadList(req, res, { published: true });
};

function loadList(req, res, query) {
  if (req.query && req.query.page && parseInt(req.query.page)) {
    paginateOptions.page = parseInt(req.query.page);
  }
  Article.paginate(query, paginateOptions, function(err, articles) {
    if(!err) {
      res.json(articles);
    }else {
      console.log('Error in first query');
    }
  });
}

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
    Article.findOneAndUpdate(query, data, function(err, article) {
      if(err) {
        console.log('Error on save!');
        res.status(500).send('We failed to save to due some reason');
      }
      res.json(article);
    });
  } else {
    data = _.set(data, 'id', moment().format('x'));
    Article.create(data, function (err, article) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.json(article);
    });
  }

};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
  var data = req.body;
  if (data.id) {
    var query = { id: req.body.id };
    Article.remove(query, function(err) {
      if(err) {
        console.log('Error on save!');
        res.status(500).send('We failed to delete to due some reason');
      }
      res.status(200).send('Delete successfully');
    });
  }

};
