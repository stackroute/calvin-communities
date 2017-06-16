/* ---------------------SERVICES----------------------*/


const model = require('cassandra-driver');

const connectionString = require('../../config');

const COMMUNITY_TOOL_TABLE = "tools";

// Connecting to cassandra

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Query to select all values from tools table

function getTools(domainName,done) {
  const query = (`SELECT toolid, action, activityevents from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainName}';`);
  return client.execute(query, (err, results) => {
    if(!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

// Inserting into tools table

function addTools(data, done) {
  const query = (`insert into ${COMMUNITY_TOOL_TABLE} (domain,toolid,action,activityevents) values('${data.domain}','${data.id}',{${data.action}},{${data.events}})`);
 return client.execute(query, (err, results) => {
  if(!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

// Updating tools action and events

function updateTools(data, value, callback) {
  const query = (`UPDATE tools SET action=action+{'${data.action}'},activityevents=activityevents+{'${data.events}'} where domain='${value.domain}' AND toolid='${value.tool}'`);
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}

// Deleting action

function deleteAction(value, callback) {
  const query = (`DELETE action['${value.name}'] FROM tools where domain='${value.domain}' and toolid='${value.tool}' IF EXISTS`);
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}

// Deleting events

function deleteEvent(value, callback) {
  const query = (`DELETE activityevents['${value.name}'] FROM tools where domain='${value.domain}' and toolid='${value.tool}' IF EXISTS`);
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}

// Deleting a row from tools table

function deleteTool(value, callback) {
  const query = (`DELETE FROM tools where domain='${value.domain}'`);
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}

module.exports = {
  deleteTool,
  deleteEvent,
  deleteAction,
  updateTools,
  addTools,
  getTools,
};

