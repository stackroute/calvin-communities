const jwt = require('jsonwebtoken');
const async = require('async');
const logger = require('../../../../logger');
const config = require('../../../../config').jwtdetails;
const publishEvent = require('../../../../common/kafkaPublisher/kafkaPublisher');

const topic = 'ToolEvents';

/*
 * verify token
 */
function verifyToken(token, done) {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      // logger.debug('error', err);
      return done(err);
    }
    logger.debug(decoded);
    return done(null, decoded);
  });
}
/*
 * check the event whether it is subscribed or not
 */
function isSubscribed(eventPayLoad, token, done) {
  /* const stringified = JSON.stringify(eventPayLoad)
  //Ignore subcribed events for now. (done for demo purpose)
  return done(undefined, stringified);
*/
  logger.debug(eventPayLoad);
  logger.debug('ddd token', token);
  logger.debug(eventPayLoad, 'payload ehre');
  logger.debug('token here', token);
  let count = 0; // eslint-disable-line no-unused-vars
  token.events.forEach((data) => {
    if (data === eventPayLoad.eventid) {
      count += 1;
    }
  });
  eventPayLoad.domain = token.domain; // eslint-disable-line no-param-reassign
  eventPayLoad.toolid = token.toolid; // eslint-disable-line no-param-reassign
  const stringified = JSON.stringify(eventPayLoad);
  logger.debug('stringified', stringified);
  return done(undefined, stringified);
}
/*
 * publish the event on topic
 */
function publishEventToTopic(token, eventPayLoad, done) {
  async.waterfall([
    verifyToken.bind(null, token),
    isSubscribed.bind(null, eventPayLoad),
    publishEvent.publishToTopic.bind(null, topic),
  ], (err, res) => {
    if (err) {
      logger.debug(err);
      return done();
    }
    logger.debug(res);
    return done();
  });
}

module.exports = {
  publishEventToTopic,
};
