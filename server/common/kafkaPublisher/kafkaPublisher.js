const kafkaNode = require('kafka-node');
const HighLevelProducer = kafkaNode.HighLevelProducer;

function publishToTopic(topic, msgs, callback) {
  console.log("publishing");
  const client = new kafkaNode.Client();
  const producer = new HighLevelProducer(client);
  // msgs=JSON.stringify(msgs);
  const payloads = [{ topic: topic, messages: msgs }];
  // Does the topic exists or not?

  producer.on('ready', () => {
    console.log("payloads of publisher", payloads);
    producer.send(payloads, (err, result) => {
      console.log("published");
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

  producer.on('error', (err) => {
    console.log(err);
  });
}


module.exports = {
  publishToTopic,
};
