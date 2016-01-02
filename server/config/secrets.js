module.exports = {
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGODB,
  sessionSecret: process.env.SESSION_SECRET
};
