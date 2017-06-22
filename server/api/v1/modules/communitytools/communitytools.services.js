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
  const query = (`SELECT toolid,actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainName}.toLowerCase()';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        done(undefined, { domain: domainName, tools: results.rows });
      } else {
        done({ error: 'please enter a valid domain name' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}


function getToolsforCRUD(domainName, tool, done) {
  const query = (`SELECT actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainName}.toLowerCase()' and toolid = '${tool}.toLowerCase()'`);
  return client.execute(query, (err, results) => {
    if (!err) {
            // console.log(results.rows);
      if (results.rows.length > 0) {
        done(undefined, { domain: domainName, tool, data: results.rows });
      } else {
        done({ error: 'Please enter a valid domain and tool name' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}


function getToolsForDeletion(domainName, tool, value, done) {
  let flag = false;
  const query = (`SELECT actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainName}.toLowerCase()' and toolid = '${tool}.toLowerCase()';`);
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
        done({ error: 'Please enter a valid tool name' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}

function getToolsForEventDeletion(domainName, tool, value, done) {
  let flag = false;
  const query = (`SELECT actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainName}.toLowerCase()' and toolid = '${tool}.toLowerCase()';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        const arr = results.rows[0].activityevents;
        arr.forEach((val) => {
          if (val === value) {
            flag = true;
          }
        });
      }
      if (flag) {
        done(undefined, { domain: domainName, tools: results.rows });
      } else {
        done({ error: 'Please enter a valid tool name' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
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
    arr.push({
      query,
      params: [val.domain.toLowerCase(),
        val.toolId.toLowerCase(), val.actions, val.activityEvents,
      ],
    });
  });
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      done(undefined, { message: 'updated tool' });
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}

// Updating tools action and events

function updateTools(data, value, done) {
  const query = (`UPDATE ${COMMUNITY_TOOL_TABLE} SET actions=actions+{'${data.action}.toLowerCase()'},activityevents=activityevents+{'${data.events}.toLowerCase()'}, updatedon=dateof(now()) where domain='${value.domain}.toLowerCase()' AND toolid='${value.tool}.toLowerCase()'`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}

// Deleting action

function deleteAction(value, done) {
  const query = (`DELETE actions['${value.name}.toLowerCase()'] FROM ${COMMUNITY_TOOL_TABLE} where domain='${value.domain}.toLowerCase()' and toolid='${value.tool}.toLowerCase()' ;`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}

// Deleting events

function deleteEvent(value, done) {
  const query = (`DELETE activityevents['${value.name}']
     FROM ${COMMUNITY_TOOL_TABLE} where domain='${value.domain}.toLowerCase()' and toolid='${value.tool}.toLowerCase()';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done({ error: 'Internal Error occured' }, undefined);
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
      done({ error: 'Internal Error occured' }, undefined);
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
  getToolsForEventDeletion,
};
