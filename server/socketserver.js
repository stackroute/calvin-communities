let io  = require('socket.io')();

io.on('connection', (clientSocket) => {
  clientSocket.on('message', (data) => {
    console.log(data);
    clientSocket.emit('fire', { "fire": "firedevent" });
  });
});

module.exports = io;
