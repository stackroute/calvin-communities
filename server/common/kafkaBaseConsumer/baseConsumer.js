 const async = require('async');

 const kafka = require('kafka-node');

 const logger = require('../../logger');

 const Consumer = kafka.Consumer;


 let messages = '';

 function getConnection(topics, done) {
   const client = require('../../config').client;

   const options = require('../../config').options;

   done(null, client, options, topics);
 }

 function subscribeToTopic(client, options, topics, done) {
   const consumer = new Consumer(client, topics, options);

   done(null, consumer);
 }

 function onMessage(consumer, done) {
   consumer.on('message', (message) => {
     logger.debug('value is', message);
         // done(null,message);return;
     messages = message;
   });

   consumer.on('error', (err) => {
         // return done(err, null);

     logger.debug('error', err);
   });
   setTimeout(() => done(null, messages.value), 1000);
 }

 function baseConsumer(topics, done) {
   async.waterfall([
     getConnection.bind(null, topics),
     subscribeToTopic,
     onMessage,
   ], (err, res) => {
     if (err) {
       return done(err, null);
     }
     return done(undefined, res);
   });
 }

 module.exports = {
   baseConsumer,
 };
