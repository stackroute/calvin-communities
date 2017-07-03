

const kafka = require('kafka-node');

const Consumer = kafka.Consumer;
const Client = kafka.Client;
const client = new Client('localhost:2181');
const options = { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

function baseConsumer(topics, done) {
  const consumer = new Consumer(client, topics, options);

  consumer.on('message', (message) => {
    done(null, message);
    console.log('value is', message);
  });

  consumer.on('error', (err) => {
    done(err, null);
    console.log('error', err);
  });
}



module.exports = {
  baseConsumer,
};
