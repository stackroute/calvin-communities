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
  const query = (`SELECT toolid,actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainName}' ALLOW FILTERING;`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done(err, undefined);
    }
  });
}


function getToolsforCRUD(domainName, tool, done) {
  const query = (`SELECT toolid,actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainName}' and toolid = '${tool}'`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        done(undefined, { domain: domainName, tools: results.rows });
      } else {
        done('Please enter a valid domain and tool name', undefined);
      }
    } else {
      done(err, undefined);
    }
  });
}


function getToolsForDeletion(domainName, tool, value, done) {
  let flag = false;
  const query = (`SELECT actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainName}' and toolid = '${tool}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        const arr = results.rows[0].actions;
        arr.forEach((val) => {
          if (val === value) {
            flag = true;
          }
        });
      }
      if (flag) {
        done(undefined, { domain: domainName, tools: results.rows });
      } else {
        done('Please enter a valid tool name', undefined);
      }
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


function addTools(data, done) {
  const arr = [];
  const query = (`insert into ${COMMUNITY_TOOL_TABLE} (domain,toolid,actions,activityevents,createdon,updatedon) values(?,?,?,?,dateof(now()),dateof(now()))`);
  data.forEach((val) => {
    arr.push({ query, params: [val.domain, val.toolId, val.actions, val.activityEvents] });
  });
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      done(undefined, 'updated tool');
    } else {
      done(err, undefined);
    }
  });
}

// Updating tools action and events

function updateTools(data, value, done) {
  const query = (`UPDATE ${COMMUNITY_TOOL_TABLE} SET actions=actions+{'${data.action}'},activityevents=activityevents+{'${data.events}'}, updatedon=dateof(now()) where domain='${value.domain}' AND toolid='${value.tool}'`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done(err, undefined);
    }
  });
}

// Deleting action

function deleteAction(value, done) {
  const query = (`DELETE actions['${value.name}'] FROM ${COMMUNITY_TOOL_TABLE} where domain='${value.domain}' and toolid='${value.tool}' ;`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
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
      done(undefined, results);
    } else {
      done(err, undefined);
    }
  });
}

// Deleting a row from tools table

function deleteTools(domainname, done) {
  const query = (`DELETE FROM ${COMMUNITY_TOOL_TABLE} where domain='${domainname.domain}' and toolid ='${domainname.tool}'`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done(err, undefined);
    }
  });
}

module.exports = {
  deleteEvent,
  deleteAction,
  updateTools,
  addTools,
  getTools,
  deleteTools,
  getToolsForDeletion,
  getToolsforCRUD,
};
