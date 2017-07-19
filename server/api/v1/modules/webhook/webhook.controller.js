const jwt = require('jsonwebtoken');
const async = require('async');
const config = require('../../../../config').jwtdetails;
const publishEvent = require('../../../../common/kafkaPublisher/kafkaPublisher');
const topic = 'ToolEvents';
// const community

function verifyToken(token, done) {

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      logger.debug('error', err);
      return done(err);
    }
    return done(null, decoded);
  });
}

function isSubscribed(eventPayLoad, token,  done) {
  let count = 0;
  token.events.forEach((data) => {
    if(data === eventPayLoad.eventid) {
      count += 1;
    }
  })
  if( count === 1) { return done(undefined, eventPayLoad)}
  if(count !== 1) {return done('not subscribed')}

}

function publishEventToTopic(token, eventPayLoad, done) {

async.waterfall([
    verifyToken.bind(null, token),
    isSubscribed.bind(null, eventPayLoad),
    publishEvent.publishToTopic.bind(null, topic)
  ], (err, res) => {
    if (err) {
      return done();
    }
    return done();
  });
}

module.exports = {
  publishEventToTopic,
};
