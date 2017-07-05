const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const request = require('supertest');

const publish = require('./kafkaPublisher');

const topic = 'test';

const data = 'hi';

[ //const data2 = 'event2 happened';
    let arr = [];

    describe('Publishment of data', () => {
        before(() => {
            consumer.removeTopics(['test'], function(err, removed) {});
            consumer.addTopics(['test'], function(err, added) {});
            publish.publishToTopic('test', 'hi', (err, res) => {
                if (err) { console.log("err"); } else { console.log(res); }
            });
        });
        it('Published', (done) => {
            var kafka = require('kafka-node'),
                Consumer = kafka.Consumer,
                client = new kafka.Client('localhost:2181'),
                consumer = new Consumer(
                    client, [
                        { topic: 'test', partition: 0, offset: (0, 1) }
                    ], {
                        autoCommit: true
                    }
                );
            consumer.on('message', function(message) {
                console.log("Message is:", message.value);
                arr.push(message.value);
                message.value.should.be.equal(data);
                // message.value.should.be.equal('event2 happened');
                return done(null, message);
            });
            consumer.on('error', function(err) {
                console.log('error', err);
                return done(err);
            });

            return null;
        });
        after(() => {
            consumer.removeTopics(['test'], function(err, removed) {});
        });
    });
