const toolSinkService = require('../../api/v1/modules/communitytools/communitytools.controller');
const registerPublisherService = require('../../common/kafkaPublisher');
const logger = require('../../logger.js');
const model = require('cassandra-driver');

const connectionString = require('../../config').connectionString;

const COMMUNITY_TOOL_EVENT_TABLE = 'communitytooleventmap';

// Connecting to cassandra

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});
module.exports = function(eventMessage) {

  logger.debug('toolsink consumed the event: ', eventMessage);
  console.log(eventMessage, "<------eventhere")
  const query = ('SELECT * FROM ' + COMMUNITY_TOOL_EVENT_TABLE + ' where domain = ? and toolid = ?');
  return client.execute(query, [eventMessage.domain, eventMessage.toolid], (err, res) => {
    if (err) {
      console.log("dberror", err);
      logger.debug('Internal Server Error');
    } else {
      console.log(res , "res here")
        if(res.rows) {
      let message = {
        domain: eventMessage.domain,
        toolid: eventMessage.toolid,
        activitytype: res.rows[0].activity,
        actortype: res.rows[0].actor,
        objecttype: res.rows[0].object,
        timestamp: Date.now(),
        payload: eventMessage,
        //refid: "Reference for community to know about the event it published, used for internal purpose"
      };
      message = JSON.stringify(message);
      console.log(message, "result")
      logger.debug("sending message", message);
      registerPublisherService.publishToTopic('CommunityActivityEvents', message, (err, res) => {
        if (err) {
          logger.debug('error occured', err);
        } else if (res) {
          logger.debug('result is here', message);
        }
      });
    }
    }

  })

};
