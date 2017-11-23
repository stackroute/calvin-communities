const async = require('async');
const kafkaNode = require('kafka-node');
const config = require('../../appconfig/');
const logger = require('../../logger');
const { Consumer } = kafkaNode;

module.exports = function (topicNameArray, consumerOptions, callback) {
  if (topicNameArray.length <= 0) {
    return;
  }

  const consumerTopics = topicNameArray.map(topic => ({ topic }));
  logger.debug('Registering for topics ', consumerTopics);
  logger.debug('working');

  const client = new kafkaNode.Client(config.kafkaConfig.ZOOKEEPER_CLIENT_URL);
  const consumer = new Consumer(client, consumerTopics, consumerOptions);

  consumer.on('message', (messageObj) => {
    logger.debug(consumerOptions);
    logger.debug('got message', messageObj);
    const msgDataObj = JSON.parse(messageObj.value);
    // logger.debug("value is",msgDataObj);
    callback(msgDataObj);
  });
};
