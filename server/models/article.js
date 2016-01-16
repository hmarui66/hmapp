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
  category: String,
  tags: [],
  published: Boolean,
});
ArticleSchema.plugin(timestamps);
ArticleSchema.index({ category: 1, createdAt: -1 });
ArticleSchema.index({ tags: 1, createdAt: -1 });
ArticleSchema.plugin(mongoosePaginate);

Article = mongoose.model('Article', ArticleSchema);

