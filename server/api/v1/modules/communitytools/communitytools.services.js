/* ---------------------SERVICES----------------------*/
const logger = require('../../../../logger');


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
  const query = (`SELECT * from ${COMMUNITY_TOOL_TABLE} WHERE domain='${domainname}';`);
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
function getCommunityTool(domain, toolid, done) {
  const query = (`SELECT * FROM ${COMMUNITY_TOOL_TABLE} where domain = ? and toolid = ?`);
  return client.execute(query, [domain, toolid], (err, res) => {
    if (err) { logger.debug('Internal Server Error', err); return done([500, 'Internal Server Error']); }
    return done(undefined, res.rows);
  });
}

function addTools(data, done) {
  const query = `insert into ${COMMUNITY_TOOL_TABLE} (domain, toolid, toolname, avatar, purpose, toolurl, actions, createdon, updatedon) values (?,?,?,?,?,?,?,dateof(now()),dateof(now()))`;

  client.execute(query, data, (err) => {
    if (err) { logger.debug('an error occured', err); return done([500, 'Internal Server Error']); }
    return done();
  });
}

function updateTool(data, done) {
  const query = `UPDATE ${COMMUNITY_TOOL_TABLE} SET toolname = ?, avatar = ?, toolurl = ?, actions = ?, purpose = ?, updatedon=dateof(now()) where domain = ? AND toolid= ?`;

  return client.execute(query, data, (err, results) => {
    if (!err) {
      return done(undefined, results);
    }
    logger.debug('error:', err);
    return done([500, 'Internal server Error']);
  });
}


module.exports = {
  getCommunityTool,
  updateTool,
  addTools,
  getTools,
};
