const jwt = require('jsonwebtoken');
const async = require('async');
const config = require('../../../../appconfig/env/development');
const publishEvent = require('../../../../common/kafkaPublisher/kafkaPublisher');


function verifyToken(token, done) {
  console.log("verify token",config.jwtdetails.secret);
  jwt.verify(token, config.jwtdetails.secret, (err, res) => {
    if (err) {
      console.log("error",err);
      return done(err);
    }
    console.log("verified", res);
    const topic =  "tools Events";
    const message =  "lorem  ipsum";
    publishEvent.publishToTopic(topic, message, (error, result) => {
      if (error) {
        console.log('error.....',error);
        return done(error);
      };
      console.log('result!!!!!')
      return done(null, result);
    });
});
}

module.exports = {
  verifyToken,
};
