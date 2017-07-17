const model = require('cassandra-driver');
const connectionString = require('../../../../config').connectionString;
const logger = require('../../../../logger');

const COMMUNITY_TOOL_EVENT_MAP = 'communitytooleventmap';

// Connecting to cassandra
const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

/*// Get list of events mapping
function getmappingDetails(tooldata, eventdata, done) {
	console.log("service");
	// const toolid = tooldata.toLowerCase();
	// const eventid = eventdata.toLowerCase();
  const query = `SELECT * from ${EVENTMAPPING_TABLE} WHERE toolid='${tooldata}' AND eventid = '${eventdata}' `;
  console.log(query ,"query here")
  return client.execute(query, (err, results) => {
  	if(err) console.log(err);
    if (!err) {
      console.log(results);
      console.log("rows", results.rows);
      console.log("length", results.rows.length);
      if (results.rows.length > 0) {
        done(undefined, { eventmapping: results.rows });
      } else {
      	console.log("error");
        done({ error: 'please enter a valid tool id' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}*/

function getEventMapping(data, done){
  const query = `select * from ${COMMUNITY_TOOL_EVENT_MAP} \
  where domain = '${data.domain}' and toolid = '${data.toolid}' `;

  client.execute(query, (err, result) => {
    if(err) {logger.error('Error posting event details', err); return done([500, 'Unexpected error occured'])};
    if(!err) { return done(undefined, result.rows); }
  })


}

function getToolEventMapping(data, done){
  const query = `select * from ${COMMUNITY_TOOL_EVENT_MAP} \
  where domain = '${data.domain}' and toolid = '${data.toolid}' `;

  client.execute(query, (err, result) => {
    if(err) {logger.error('Error posting event details', err); return done([500, 'Unexpected error occured'])};
    if(!err) { return done(undefined, result.rows); }
  })


}

function postEventMapping(data, done){
  const query = `insert into ${COMMUNITY_TOOL_EVENT_MAP} (domain, toolid, eventid, eventname, \
   eventdescription, communityactivityevent, metadata) values ('${data.domain}', '${data.toolid}', \
   '${data.eventid}', '${data.eventname}', '${data.eventdescription}', '${data.communityactivityevent}', \
   '${data.metadata}')`;

   client.execute(query, (err) => {
    if(err) {logger.error('Error posting event details', err); return done([500, 'Unexpected error occured'])};
    if(!err) { return done(undefined, 'data'); }
   })

}

function updateEventMapping(){

}


module.exports = {
  getToolEventMapping,
	getEventMapping,
  postEventMapping,
  updateEventMapping
}
