/*const jwt = require('jsonwebtoken');
// const async = require('async');
const config = require('../../../../appconfig/env/development');
const publishEvent = require('../../../../common/kafkaPublisher/kafkaPublisher');
const token = require('../../../../config').jwtdetails;

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
  // console.log('verify token', config.jwtdetails.secret);
  jwt.verify(token, config.jwtdetails.secret, (err) => {
    if (err) {
      // console.log('error', err);
      return done(err);
    }
    // console.log('verified', res);
    const topic = 'tools Events';
    const message = 'lorem  ipsum';
    publishEvent.publishToTopic(topic, message, (error, result) => {
      if (error) {
        // console.log('error.....', error);
        return done(error);
      }
      // console.log('result!!!!!');
      return done(null, result);
    });
    return null;
  });
}

module.exports = {
  verifyToken,
};
*/