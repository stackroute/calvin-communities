const kafkaNode = require('kafka-node');
const HighLevelProducer = kafkaNode.HighLevelProducer;

function publishToTopic(topic, msgs, callback) {
  const client = new kafkaNode.Client();
  const producer = new HighLevelProducer(client);

  const payloads = [{ topic, messages: msgs }];

    // Does the topic exists or not?

  producer.on('ready', () => {
    producer.send(payloads, (err, result) => {
            // Close the connection
      producer.close();
      client.close();

      if (err) {
        console.log('Error in sending message to kafka topic: ', err);
        callback(err);
        return;
      }
            // console.log("What is the result: ", result);
      callback(null, result);
    });
  });

  producer.on('error', (err) => {});
}

module.exports = {
  publishToTopic,
};
