/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var mongoosePaginate = require('mongoose-paginate');

var ArticleSchema = new mongoose.Schema({
  id: String,
  title: String,
  text: String,
  published: Boolean,
});
ArticleSchema.plugin(timestamps);
ArticleSchema.plugin(mongoosePaginate);

Article = mongoose.model('Article', ArticleSchema);

