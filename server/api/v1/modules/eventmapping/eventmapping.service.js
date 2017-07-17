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
function getmappingDetails(toolData, done) {
	const toolData = toolData.toLowerCase();
	const query = (`SELECT * from ${EVENTMAPPING_TABLE} WHERE toolid = ${toolData}`);
	return client.execute(query, (err, results) => {
		if(!err) {
			     if (results.rows.length > 0) {
        done(undefined, { toolid : toolData, eventmapping: results.rows });
      } else {
        done({ error: 'please enter a valid domain name' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
	});
}


module.exports = {
	getmappingDetails,
}
