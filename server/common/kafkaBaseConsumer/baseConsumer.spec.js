const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const request = require('supertest');

const kafka = require('kafka-node');

const Consumer = kafka.Consumer;

// const data = 'event consumed';

describe('consuming the event', () => {
  it('consumer should consume the event', (done) => {
    let  Producer = kafka.Producer,
      KeyedMessage = kafka.KeyedMessage,
      client = new kafka.Client(),
      producer = new Producer(client),
      payloads = [
        { topic: 'topic1', messages: 'event consumed', partition: 0 },
      ];
    producer.on('ready', function() {
      producer.send(payloads, function(err, data) {
        console.log("payload here is", payloads);
       // console.log("data here is", data);
        // payloads[0].messages.should.be.equal('event consumed');
      });
      return done(null, payloads);
    });

    producer.on('error', function(err) {
      console.log(err);
      return done(err,null);
    })

  });
  return null;
  after(() =>{
  	Consumer.baseConsumer()
  })
});
