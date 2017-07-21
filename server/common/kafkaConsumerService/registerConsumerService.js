const async = require('async');
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const logger = require('../../logger');


module.exports = function(topicNameArray, consumerOptions, callback) {
  if (topicNameArray.length <= 0) {
    return;
  }

  const consumerTopics = topicNameArray.map(topic => ({ topic }));
  console.log('Registering for topics ', consumerTopics);
  console.log('working');
  const client = new kafka.Client();
  const consumer = new Consumer(client, consumerTopics, consumerOptions);

  consumer.on('message', (messageObj) => {
    console.log(consumerOptions);
    console.log("got message", messageObj);
    const msgDataObj = JSON.parse(messageObj.value);
    // console.log("value is",msgDataObj);
    callback(msgDataObj);
  });
};
