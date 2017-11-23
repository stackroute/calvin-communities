const kafkaNode = require('kafka-node');
const config = requie('../../appconfig/');

const { HighLevelProducer } = kafkaNode;

function publishToTopic(topic, msgs, callback) {
  const client = new kafkaNode.Client(config.kafkaConfig.ZOOKEEPER_CLIENT_URL);
  const producer = new HighLevelProducer(client);
  // msgs=JSON.stringify(msgs);
  const payloads = [{ topic, messages: msgs }];
  // Does the topic exists or not?
  console.log("Trying to publish to ", topic, " message ", msgs);
  producer.on('ready', () => {
    console.log("Ready to publish to ", topic, " message ", msgs);
    producer.send(payloads, (err, result) => {
      // Close the connection
      producer.close();
      client.close();

      if (err) {
        console.log("Error in publishing to ", topic, " message ", msgs, " error: ", err);
        callback(err);
        return;
      }

      console.log("result of kafka producer publish message ", result);
      callback(null, result);
    });
  });

  producer.on('error', (err) => {
    console.log("Error in kafka producer ", err);
  });
}


module.exports = {
  publishToTopic,
};
