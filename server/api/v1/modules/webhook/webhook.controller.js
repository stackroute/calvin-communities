const jwt = require('jsonwebtoken');
const async = require('async');
const config = require('../../../../appconfig/env/development');
const publishEvent = require('../../../../common/kafkaPublisher/kafkaPublisher');

function verifyToken(token, done) {

  jwt.verify(token, config.jwtdetails.secret, (err, decoded) => {
  console.log('verify token');
    if (err) {
      console.log('error');
      return done(err);
    }
    console.log('verified', res);
    done(null, decoded);
  });
}

function publishEventToTopic(token, eventPayload, done) {

  token = jwt.sign({
    "domain": "stack",
    "toolId": "github",
  }, config.jwtdetails.secret, { expiresIn: config.jwtdetails.expiryTime });

  async.waterfall([
    verifyToken.bind(null, token),
    publishEvent.publishEventToTopic.bind(null, topic, payload)
  ], (err, result) => {
    if (err) {
      done(err, 'Internal Error');
    }
    done(null, 'published');
  });
}

module.exports = {
  publishEventToTopic,
}
