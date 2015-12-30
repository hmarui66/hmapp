/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  id: String,
  title: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

Article = mongoose.model('Article', ArticleSchema);

