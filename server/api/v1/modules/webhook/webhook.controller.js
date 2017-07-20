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
    console.log(decoded)
    return done(null, decoded);
  });
}
/*
* check the event whether it is subscribed or not
*/
function isSubscribed(eventPayLoad, token,  done) {

  const stringified = JSON.stringify(eventPayLoad)
  //Ignore subcribed events for now. (done for demo purpose)
  return done(undefined, stringified);

  console.log(eventPayLoad);
  console.log("ddd token",token);
  let count = 0;
  token.events.forEach((data) => {
    if(data === eventPayLoad.eventid) {
      count += 1;
    }
  })
  //const stringified = JSON.stringify(eventPayLoad)
  console.log("stringified", stringified)
  if(count === 1) {return done(undefined, stringified)}
  if(count !== 1) {return done('not subscribed')}
}
/*
* publish the event on topic
*/
function publishEventToTopic(token, eventPayLoad, done) {

async.waterfall([
    verifyToken.bind(null, token),
    isSubscribed.bind(null, eventPayLoad),
    publishEvent.publishToTopic.bind(null, topic)
  ], (err, res) => {
    if (err) {
      console.log(err);
      return done();
    }
    console.log(res)
    return done();
  });
}

module.exports = {
  publishEventToTopic,
};
