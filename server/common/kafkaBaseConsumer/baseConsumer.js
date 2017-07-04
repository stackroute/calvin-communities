const async = require('async');

const kafka = require('kafka-node');

const logger = require('../../logger');

const Consumer = kafka.Consumer;

let client,
  options,
  consumer;

function baseConsumer(topics, done) {
  async.waterfall([
    function(done) {
      client = require('../../config').client;

      options = require('../../config').options;

      done(null, client, options, topics);
    },
    function(client, options, topics, done) {
      consumer = new Consumer(client, topics, options);

      done(null, consumer);
    },
    function(consumer, done) {
      consumer.on('message', (message) => {
        logger.debug('value is', message);
        // done(null,message);
      });

      consumer.on('error', (err) => {
        done(err, null);

        logger.debug('error', err);
      });
    },
  ], (err, res) => {
    if (err) {
      return done(err, null);
    }
    return done(undefined, res);
  });
}

module.exports = {
  baseConsumer,
};
