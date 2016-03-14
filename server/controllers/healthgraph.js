var fetch = require('isomorphic-fetch');
var secrets = require('./../config/secrets');
var querystring = require('querystring');

var clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};
var redirectUri = `http://${clientConfig.host}:${clientConfig.port}/auth/healthgraph/callback`;

/**
 * authorize
 */
exports.authorize = function(req, res) {
  res.redirect(303, `https://runkeeper.com/apps/authorize?client_id=${secrets.healthGraphClientId}&response_type=code&redirect_uri=${redirectUri}`);
};

exports.callback = function(req, res) {
  var code = req.query.code;
  if (!code) {
    throw Error('callback query parameter is invalid');
  }
  var postData = querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    client_id: secrets.healthGraphClientId,
    client_secret: secrets.healthGraphSecret,
    redirect_uri: redirectUri
  });
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    },
    body: postData
  };
  fetch('https://runkeeper.com/apps/token', options)
    .then(response => response.json())
    .then(json => {
      res.json(json);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.activities = function(req, res) {
  fetch('http://api.runkeeper.com/fitnessActivities', {
    headers: {
      Authorization: 'Bearer ' + secrets.healthGraphToken,
      Accept: 'application/vnd.com.runkeeper.FitnessActivityFeed+json'
    }
  })
  .then(response => response.json())
  .then(json => {
    res.json(json);
  })
  .catch(err => {
    console.log(err);
    res.status(400).send(err);
  })
};
