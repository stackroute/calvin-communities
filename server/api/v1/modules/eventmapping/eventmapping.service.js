const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const EVENTMAPPING_TABLE = 'eventmapping';

// Connecting to cassandra

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Get list of events mapping
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
}

module.exports = {
	getmappingDetails,
}
