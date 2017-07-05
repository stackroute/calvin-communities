const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const request = require('supertest');

const kafka = require('kafka-node');

const allTopics = [{ topic: 'topic1' }];

const Consumer = require('./baseConsumer');

const publish = require('../kafkaPublisher/kafkaPublisher');

describe('consuming the event', () => {
    before(() => {
        publish.publishToTopic('topic1', 'hi', (err, res) => {
            if (err) { console.log("err"); } else { console.log(res); }
        });
    });

    it('consumer should consume the messages from the topic', (done) => {
        Consumer.baseConsumer(allTopics, (err, res) => {
            if (err) {

                return setTimeout(done(err, null), 1000);
            }
            console.log("result", res);
            return setTimeout(done(null, res), 1000);

        })
        return setTimeout(done, 2000);
    })
});
