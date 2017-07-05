const async = require('async');
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const logger = require('../../logger');
// const config = require('../../config');

module.exports = function(topicNameArray, consumerOptions, callback) {
  if (topicNameArray.length <= 0) {
    return;
  }

  let consumerTopics = topicNameArray.map((topic) => {
    return { topic };
  });
  console.log("Registering for topics ", consumerTopics);

  let client = new kafka.Client();
  let consumer = new Consumer(client, consumerTopics, consumerOptions);

  consumer.on('message', (messageObj) => {
    let msgDataObj = JSON.parse(messageObj.value);
    callback(msgDataObj);
  });
}
