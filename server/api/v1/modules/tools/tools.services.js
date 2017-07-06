/* ---------------------SERVICES----------------------*/


const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const TOOL_TABLE = 'tools';

// Connecting to cassandra

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Query to select values from tools table

function getTools(domainName, done) {
  const query = (`SELECT domains from ${TOOL_TABLE} WHERE toolid='${domainName.toLowerCase()}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        done(undefined, { toolid: domainName, communities: results.rows });
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
  const query = (`SELECT domains from ${TOOL_TABLE} WHERE toolid='${domainName.toLowerCase()}';`);
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
  const query = (`update ${TOOL_TABLE} set domains = domains + {'${data.tools.toLowerCase()}'} where toolid='${domainName.domain.toLowerCase()}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done({ error: 'Internal Error Occured' }, undefined);
    }
  });
}

function addTools(data, domain, done) {
  console.log('in tools service');
  console.log(data);
  console.log(domain);
  const arr = [];
  let query;
  data.forEach((val) => {
    query = (`update ${TOOL_TABLE} set domains = domains + {'${domain.toLowerCase()}'} where toolid='${val.toolId.toLowerCase()}';`);
    arr.push({ query });
  });

  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      done(undefined, { message: 'updated tool' });
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}


function deleteTools(data, done) {
  const query = (`DELETE domains['${data.domainname.toLowerCase()}'] FROM ${TOOL_TABLE} where toolid='${data.toolid.toLowerCase()}';`);
  return client.execute(query, (err) => {
    if (!err) {
      done(undefined, { message: 'deleted' });
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
  getToolsForDeletion,
};
