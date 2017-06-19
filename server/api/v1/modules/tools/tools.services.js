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

function updateTools(domainname, data, done) {
  const arr = [];
  data.forEach((val) => {
    arr.push(`'${val.toolId}'`);
  });
  // console.log(arr);
  const query = (`insert into ${TOOL_TABLE} (domain,tools) values('${domainname}',{${arr}})`);
  return client.execute(query, (err) => {
    if (!err) {
      return done(err, 'results.rows');
    }
    return done(err, undefined);
           // console.log(err);
  });
}


function deleteTools(data, done) {
  // console.log('dkfhjdskfj');
  const query = (`DELETE tools['${data.tool}'] FROM ${TOOL_TABLE} where domain='${data.domain}';`);
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
  deleteTools,
};
