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

function getDomainsAndTools(done) {
  // console.log('toolsservices');
  const query = (`SELECT * FROM ${TOOL_TABLE}`);

  return client.execute(query, (err, results) => {
    if (!err) {
      // console.log('result', results.rows);
      done(undefined, results.rows);
    } else {
      done(err, undefined);
    }
  });
}
// Query to select values from tools table

function getTools(domainName, done) {
  const query = (`SELECT * from ${TOOL_TABLE} WHERE toolid='${domainName.toLowerCase()}';`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        // console.log("in service", results.rows[0]);
        done(undefined, { toolid: domainName, toolname: results.rows[0].toolname, communities: results.rows[0].domains });
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
        console.log(results.rows[0]);
        const arr = results.rows[0].domains;
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

function addTools(data, domain, done) {
  // console.log('inside tools reverse');
  const query = (`update ${TOOL_TABLE} set domains = domains + {'${domain.toLowerCase()}'}, avatar= '${data.avatar}', toolname = '${data.toolName.toLowerCase()}'  where toolid='${data.toolId.toLowerCase()}';`);

  return client.execute(query, (err) => {
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
  deleteTools,
  getToolsForDeletion,
  getDomainsAndTools,
};
