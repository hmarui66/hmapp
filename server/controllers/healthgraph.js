var fetch = require('isomorphic-fetch');
var querystring = require('querystring');

/**
 * authorize
 */
exports.authorize = function(req, res) {
  res.redirect(303, 'https://runkeeper.com/apps/authorize?client_id=e731d1247c7d4c0da7208802a71a2f29&response_type=code&redirect_uri=http://localhost:3000/auth/healthgraph/callback');
};

exports.callback = function(req, res) {
  var code = req.query.code;
  if (!code) {
    throw Error('callback query parameter is invalid');
  }
  var postData = querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    client_id: 'e731d1247c7d4c0da7208802a71a2f29',
    client_secret: 'a35e74d5c626494fa808d96fd17323e2',
    redirect_uri: 'http://localhost:3000/auth/healthgraph/callback'
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
      return fetch('http://api.runkeeper.com/fitnessActivities', {
        headers: {
          Authorization: json.token_type + ' ' + json.access_token,
          Accept: 'application/vnd.com.runkeeper.FitnessActivityFeed+json'
        }
      });
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      res.json(json);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
};
