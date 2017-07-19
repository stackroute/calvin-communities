let io  = require('socket.io')();
const redis = require('redis');
let redisClient = redis.createClient();

io.on('connection', (clientSocket) => {
  //Subscribe to redis channel on a client connection
  redisClient.subscribe('notification');
  
  redisClient.on('message', (channel, message) => {
    clientSocket.emit('communityEvent', message);
  });
  
  clientSocket.on('disconnect', function() {
    if (redisClient) {
      redisClient.unsubscribe();
      redisClient.quit();
      redisClient = undefined;
    }
  });
});

module.exports = io;
