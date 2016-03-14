module.exports = {
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGODB,
  sessionSecret: process.env.SESSION_SECRET,
  healthGraphClientId: process.env.HEALTH_GRAPH_CLIENT_ID,
  healthGraphSecret: process.env.HEALTH_GRAPH_SECRET,
  healthGraphToken: process.env.HEALTH_GRAPH_ACCESS_TOKEN
};
