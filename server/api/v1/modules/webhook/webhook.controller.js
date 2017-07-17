const jwt = require('jsonwebtoken');
const config = require('../../../config');
const publishEvent = require('../../../../common/kafkaPublisher/kafkaPublisher');


function verifyToken(token, done) {
  console.log('verify token');
  jwt.verify(token, config.appConstants.secret, (err, decoded) => {
    if (err) {
      console.log('error');
      return done(err, 'Unauthorized');
    }
    console.log('verified');
    publishEvent.publishToTopic(topic, payload, (error, result) => {
      if (error) {
        return done(undefined, error);
      }
      return done(undefined, result);
    });
  });
}

module.exports = {
  verifyToken,
};
