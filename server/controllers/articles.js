var mongoose = require('mongoose');
var _ = require('lodash');
var Article = mongoose.model('Article');


/**
 * List
 */
exports.all = function(req, res) {
  Article.find({}).exec(function(err, articles) {
    if(!err) {
      res.json(articles);
    }else {
      console.log('Error in first query');
    }
  });
};
