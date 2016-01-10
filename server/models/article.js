/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ArticleSchema = new mongoose.Schema({
  id: String,
  title: String,
  text: String,
  published: Boolean,
  createdAt: { type: Date, default: Date.now },
});
ArticleSchema.plugin(mongoosePaginate);

Article = mongoose.model('Article', ArticleSchema);

