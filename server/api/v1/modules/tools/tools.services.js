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
  const query = (`SELECT tools from ${TOOL_TABLE} WHERE domain='${domainName.toLowerCase()}' ALLOW FILTERING;`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        done(undefined, { domain: domainName, tools: results.rows });
      } else {
        done({ error: 'please enter a valid domain name' }, undefined);
      }
    } else {
      done(err, undefined);
    }
  });
}


function getToolsForDeletion(domainName, value, done) {
  let count = false;
  const query = (`SELECT tools from ${TOOL_TABLE} WHERE domain='${domainName.toLowerCase()}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        const arr = results.rows[0].tools;
        arr.forEach((val) => {
          if (val === value) {
            count = true;
          }
        });
      }
      if (count) {
        done(undefined, results);
      } else {
        done({ error: 'please enter a valid tool' }, undefined);
      }
    } else {
      done({ error: 'Internal error' }, undefined);
    }
  });
}

// Inserting into tools table

function updateTools(data, domainName, done) {
  const query = (`update ${TOOL_TABLE} set tools = tools + {'${data.tools.toLowerCase()}'} where domain='${domainName.domain.toLowerCase()}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done({ error: 'Internal Error Occured' }, undefined);
    }
  });
}

function addTools(data, done) {
  const arr = [];
  let domainname;
  data.forEach((val) => {
    arr.push(`'${val.toolId.toLowerCase()}'`);
    domainname = val.domain.toLowerCase();
  });
    // console.log(arr);
  const query = (`insert into ${TOOL_TABLE} (domain,tools) values('${domainname}',{${arr}})`);
  return client.execute(query, (err) => {
    if (!err) {
      return done(undefined);
    }
    return done(err);
        // console.log(err);
  });
}


function deleteTools(data, done) {
  const query = (`DELETE tools['${data.tool.toLowerCase()}'] FROM ${TOOL_TABLE} where domain='${data.domain}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done(err, { message: 'deleted' });
    }
  });
}


module.exports = {
  addTools,
  getTools,
  updateTools,
  deleteTools,
  getToolsForDeletion,
};
