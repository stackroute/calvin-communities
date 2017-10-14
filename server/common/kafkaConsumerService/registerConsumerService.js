require('async');
const kafka = require('kafka-node');

const { Consumer } = kafka;

const logger = require('../../logger');


module.exports = function (topicNameArray, consumerOptions, callback) {
  if (topicNameArray.length <= 0) {
    return;
  }

  const consumerTopics = topicNameArray.map(topic => ({ topic }));
  logger.debug('Registering for topics ', consumerTopics);
  logger.debug('working');
  const client = new kafka.Client();
  const consumer = new Consumer(client, consumerTopics, consumerOptions);

  consumer.on('message', (messageObj) => {
    logger.debug(consumerOptions);
    logger.debug('got message', messageObj);
    const msgDataObj = JSON.parse(messageObj.value);
    // logger.debug("value is",msgDataObj);
    callback(msgDataObj);
  });
};
