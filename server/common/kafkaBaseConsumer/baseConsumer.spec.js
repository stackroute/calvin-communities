const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const request = require('supertest');

const kafka = require('kafka-node');

const allTopics = [{ topic: 'topic1' }];

const Consumer = require('./baseConsumer');

describe('consuming the event', () => {
    before(() => {
    	let kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.Client(),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),
    payloads = [
        { topic: 'topic1', messages: ['hello', 'world','sandhya here'], partition: 0 },
        { topic: 'topic2', messages: ['hello', 'world','sandhya here', km] }
    ];

    console.log("producer",producer);

producer.on('ready', function() {
    producer.send(payloads, function(err, data) {
        payloads.forEach((payload) => {
            console.log("payload here is", payload.messages);
        });

        console.log("data here is", data);
    });
});

producer.on('error', function(err) {
    console.log(err);
})
});

    it('consumer should consume the messages from the topic',(done) =>{
  	Consumer.baseConsumer(allTopics,(err,res)=>{
  		if(err){
  			done(err,null);
  		}
  		else{
  			done(null,res);
  		}
  	})
  })
});
