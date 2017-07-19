const redis = require('redis');
const client = redis.createClient();

module.exports = function (eventMessage) { 
    client.publish('notification', eventMessage);
}
