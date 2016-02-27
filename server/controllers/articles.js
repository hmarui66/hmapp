var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');
var Article = mongoose.model('Article');

function loadList(req, res, query) {
  var paginateOptions = {
    sort: { createdAt: 'desc' },
    limit: 10
  };

  if (req.query) {
    if (req.query.page && parseInt(req.query.page)) {
      paginateOptions.page = parseInt(req.query.page);
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.tags) {
      query.tags = req.query.tags;
    }
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
 * List
 */
exports.published = function(req, res) {
  loadList(req, res, { published: true });
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

/**
 * Draft List
 */
exports.drafts = function(req, res) {
  loadList(req, res, { published: false });
};

/**
 * @todo pre countup
 * Category list
 */
 exports.categories = function(req, res) {
  Article.aggregate().match({
    published: true,
    category: {'$ne': null}
  }).group({
    _id: '$category',
    count: {'$sum': 1}
  }).exec(function (err, categories) {
    if(err) {
      console.log('Error on get categories');
      res.status(500).send('We failed to get categories to due some reason');
    }
    res.json(categories);
  });
 };

 /**
 * List with category condition
 */
exports.category = function(req, res) {
  loadList(req, res, { published: true, category: req.params.category });
};

/**
 * @todo pre countup
 * Tag list
 */
 exports.tags = function(req, res) {
  Article.aggregate().unwind('tags').match({
    published: true,
    tags: {'$ne': null}
  }).group({
    _id: '$tags',
    count: {'$sum': 1}
  }).exec(function (err, categories) {
    if(err) {
      console.log('Error on get categories');
      res.status(500).send('We failed to get categories to due some reason');
    }
    res.json(categories);
  });
 };

/**
 * List with tag condition
 */
exports.tag = function(req, res) {
  loadList(req, res, { published: true, tags: req.params.tag });
};
