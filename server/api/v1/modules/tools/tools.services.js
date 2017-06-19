/* ---------------------SERVICES----------------------*/


const model = require('cassandra-driver');

const connectionString = require('../../../../config');

const TOOL_TABLE = 'tools';

// Connecting to cassandra

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Query to select values from tools table

function getTools(domainName, done) {
  const query = (`SELECT tools from ${TOOL_TABLE} WHERE domain='${domainName}' ALLOW FILTERING;`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

// Inserting into tools table

function addTools(data, done) {
  const query = (`insert into ${TOOL_TABLE} (domain,tools) values('${data.domain}',{${data.tools}})`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

function updateTools(data, value, done) {
  const query = (`UPDATE ${TOOL_TABLE} SET tools=tools+{'${data.tool}'} where domain='${value.domain}'`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results);
    } else {
      done(err, undefined);
    }
  });
}

function deleteTool(data, done) {
  const query = (`DELETE FROM ${TOOL_TABLE} where domain='${data.domain}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results);
    } else {
      done(err, undefined);
    }
  });
}


module.exports = {
  addTools,
  getTools,
  updateTools,
  deleteTool,
};
