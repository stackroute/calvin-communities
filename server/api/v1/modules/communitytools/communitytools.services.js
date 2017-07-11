/* ---------------------SERVICES----------------------*/


const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const COMMUNITY_TOOL_TABLE = 'communitytools';

// Connecting to cassandra

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Query to select values from tools table

function getTools(domainName, done) {
  const domainname = domainName.toLowerCase();
  const query = (`SELECT toolid,actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainname}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      // console.log(results.rows);
      if (results.rows.length > 0) {
        done(undefined, { domain: domainname, tools: results.rows });
      } else {
        done({ error: 'please enter a valid domain name' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}


function getToolsforCRUD(domainName, tool, done) {
  const domainname = domainName.toLowerCase();
  const toolid = tool.toLowerCase();
  // console.log(domainname);
  // console.log(toolid);
  const query = (`SELECT actions, activityevents from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainname}' and toolid = '${toolid}' ALLOW FILTERING`);
  return client.execute(query, (err, results) => {
    if (!err) {
      // console.log(results.rows);
      if (results.rows.length > 0) {
        done(undefined, { domain: domainname, toolid, data: results.rows });
      } else {
        done({ error: 'Please enter a valid domain and tools name' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}


function getToolsForDeletion(domainName, tool, value, done) {
  let flag = false;
  const domainname = domainName.toLowerCase();
  const toolid = tool.toLowerCase();
  const values = value.toLowerCase();


  const query = (`SELECT actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainname}' and toolid = '${toolid}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        const arr = results.rows[0].actions;
        arr.forEach((val) => {
          if (val === values) {
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
  const domainname = domainName.toLowerCase();

  const toolid = tool.toLowerCase();

  const values = value.toLowerCase();
  const query = (`SELECT actions,activityevents,createdon,updatedon from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainname.toLowerCase()}' and toolid = '${toolid.toLowerCase()}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        const arr = results.rows[0].activityevents;
        arr.forEach((val) => {
          if (val === values) {
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


function addTools(data, domain, done) {
  const arr = [];
  const query = (`insert into ${COMMUNITY_TOOL_TABLE} (domain,toolid,actions,activityevents,createdon,updatedon) values(?,?,?,?,dateof(now()),dateof(now()))`);
  data.forEach((val) => {
    const actions = val.actions.map(x => x.toLowerCase());
    const activityEvents = val.activityEvents.map(x => x.toLowerCase());
    arr.push({
      query,
      params: [domain.toLowerCase(),
        val.toolId.toLowerCase(), actions, activityEvents,
      ],
    });
  });
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      return getTools(domain, done);
    }
    return done({ error: 'Internal Error occured' }, undefined);
  });
}

// Updating tools action and events

function updateTools(data, value, done) {
  const query = (`UPDATE ${COMMUNITY_TOOL_TABLE} SET actions=actions+{'${data.action.toLowerCase()}'},activityevents=activityevents+{'${data.events.toLowerCase()}'}, updatedon=dateof(now()) where domain='${value.domainname.toLowerCase()}' AND toolid='${value.toolid.toLowerCase()}'`);
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
  const name = value.name.toLowerCase();
  // console.log(value.name);
  const query = (`DELETE actions['${name}'] FROM ${COMMUNITY_TOOL_TABLE} where domain='${value.domainname.toLowerCase()}' and toolid='${value.toolid.toLowerCase()}' ;`);
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
  const name = value.name.toLowerCase();
  const query = (`DELETE activityevents['${name}']
     FROM ${COMMUNITY_TOOL_TABLE} where domain='${value.domain.toLowerCase()}' and toolid='${value.tool.toLowerCase()}';`);
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
  const query = (`DELETE FROM ${COMMUNITY_TOOL_TABLE} where domain='${domainname.domainname.toLowerCase()}' and toolid ='${domainname.toolid.toLowerCase()}'`);
  return client.execute(query, (err) => {
    if (!err) {
      done(undefined);
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
