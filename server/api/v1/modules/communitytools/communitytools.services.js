/* ---------------------SERVICES----------------------*/


const model = require('cassandra-driver');

const connectionString = require('../../../../config');

const COMMUNITY_TOOL_TABLE = 'communitytools';

// Connecting to cassandra

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Query to select values from tools table

function getTools(domainName, done) {
  const query = (`SELECT toolid, action, activityevents from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainName}' ALLOW FILTERING;`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

// Inserting into tools table

/* function addTools(data, done) {
  const query = (`insert into ${COMMUNITY_TOOL_TABLE} (domain,toolid,action,activityevents)
   values('${data.domain}','${data.id}',{${data.action}},{${data.events}})`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}*/


function addTools(domainname, data, done) {
  const arr = [];
  const query = (`insert into ${COMMUNITY_TOOL_TABLE} (domain,toolid,action,activityevents) values(?,?,?,?)`);
  data.forEach((val) => {
    arr.push({ query, params: [domainname, val.toolId, val.actions, val.activityEvents] });
  });
  // console.log(arr);
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      done(undefined, 'results.rows');
    } else {
      done(err, undefined);
    }
  });
}

// Updating tools action and events

function updateTools(data, value, done) {
  const query = (`UPDATE ${COMMUNITY_TOOL_TABLE} SET action=action+{'${data.action}'},activityevents=activityevents+{'${data.events}'} where domain='${value.domain}' AND toolid='${value.tool}'`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done(err, undefined);
    }
  });
}

/* // Deleting action

function deleteAction(value, done) {
    const query = (`DELETE action['${value.name}']
     FROM ${COMMUNITY_TOOL_TABLE} where domain='${value.domain}' and toolid='${value.tool}' ;`);
    return client.execute(query, (err, results) => {
        if (!err) {
            done(err, results);
        } else {
            done(err, undefined);
        }
    });
}

// Deleting events

function deleteEvent(value, done) {
    const query = (`DELETE activityevents['${value.name}']
     FROM ${COMMUNITY_TOOL_TABLE} where domain='${value.domain}' and toolid='${value.tool}';`);
    return client.execute(query, (err, results) => {
        if (!err) {
            done(err, results);
        } else {
            done(err, undefined);
        }
    });
}
*/
// Deleting a row from tools table

function deleteTools(domainname, done) {
  const query = (`DELETE FROM ${COMMUNITY_TOOL_TABLE} where domain='${domainname.domain}' and toolid ='${domainname.tool}'`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results);
    } else {
      done(err, undefined);
    }
  });
}

module.exports = {
   // deleteEvent,
   // deleteAction,
  updateTools,
  addTools,
  getTools,
  deleteTools,
};
