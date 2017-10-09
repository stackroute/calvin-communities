const io = require('socket.io')();
const redis = require('redis');

let redisClient;
const config = require('./config').redis;

io.on('connection', (clientSocket) => {
  if (!redisClient) {
    redisClient = redis.createClient({
      host: config.host,
      port: config.port,
    });
  }

  // Subscribe to redis channel on a client connection
  redisClient.subscribe('notification');


  redisClient.on('message', (channel, message) => {
    clientSocket.emit('communityEvent', message);
  });

  clientSocket.on('disconnect', () => {
    if (redisClient) {
      redisClient.unsubscribe();
      redisClient.quit();
      redisClient = undefined;
    }
  });
});

module.exports = io;
