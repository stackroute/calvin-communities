const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars
const kafka = require('kafka-node');
const kafkaPublisher = require('../kafkaPublisher/kafkaPublisher');

const registerConsumerService = require('./registerConsumerService');

describe('Testing registering a consumer service to kafka topic', () => {
  before(() => {});

  it('consumer should consume the messages from the topic', (done) => {
    const topicNameArray = ['topic1', 'topic2'];
    const consumerOptions = { autoCommit: false };
    const msg = { event: 'new-community', payload: { domain: 'calvin.sro1', name: 'Calvin StackRoute One' } };

    kafkaPublisher.publishToTopic(topicNameArray[0], JSON.stringify(msg), (err, res) => {
      if (err) {
        console.log('Error in publishing topic ', err);
        done(err);
      }

      registerConsumerService(topicNameArray, consumerOptions, (message) => {
        // console.log("Recieved new message ", message);
        message.should.deep.equal(msg);
        done();
      });
    }); // end of publisher
  }); // end of test scenario

  /* it('standalone consumer registraiton to recieve a message', function(done){
    let topic = "topic1";
    let msg = "hello";

    registerConsumerService(topic, (mesage) => {
        message.should.be.equal(msg);
        done();
        return;
      });
  });*/
});
