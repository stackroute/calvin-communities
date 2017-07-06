const async = require('async');
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const logger = require('../../logger');
// const config = require('../../config');

module.exports = function (topicNameArray, consumerOptions, callback) {
  if (topicNameArray.length <= 0) {
    return;
  }

  // console.log(callback);
  const consumerTopics = topicNameArray.map(topic => ({ topic }));
  console.log('Registering for topics ', consumerTopics);

  const client = new kafka.Client();
  const consumer = new Consumer(client, consumerTopics, consumerOptions);

  consumer.on('message', (messageObj) => {
    console.log("got message",messageObj);
    const msgDataObj = JSON.parse(messageObj.value);
     // console.log("value is",msgDataObj);
    callback(msgDataObj);
  });
};
