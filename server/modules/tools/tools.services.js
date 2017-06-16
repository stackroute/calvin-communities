/* ---------------------SERVICES----------------------*/


const model = require('cassandra-driver');

const connectionString = require('../../config');

// Connecting to cassandra

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Query to select all values from tools table

function getTools(callback) {
  const query = ('SELECT * from tools');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}

// Inserting into tools table

function addTools(data, callback) {
  const query = (`insert into tools (domain,toolid,actions,activityevents) values('${data.domain}','${data.id}',{${data.action}},{${data.events}})`);
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}

// Updating tools action and events

function updateTools(data, value, callback) {
  const query = (`UPDATE tools SET actions=actions+{'${data.action}'},activityevents=activityevents+{'${data.events}'} where domain='${value.domain}' AND toolid='${value.tool}' IF EXISTS`);
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}

// Deleting action

function deleteAction(value, callback) {
  const query = (`DELETE actions['${value.name}'] FROM tools where domain='${value.domain}' and toolid='${value.tool}' IF EXISTS`);
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

