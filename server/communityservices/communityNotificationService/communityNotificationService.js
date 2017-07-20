const redis = require('redis');
let redisClient = undefined;
const rediss = require('./../../config').redis;

module.exports = function (eventMessage) {

     if (!redisClient) {
    redisClient = redis.createClient({
      host: rediss.host,
      port: rediss.port
    });
  }
   
    redisClient.publish('notification', JSON.stringify(eventMessage));
}
