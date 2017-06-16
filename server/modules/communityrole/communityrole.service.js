const model = require('cassandra-driver');
const connectionString = require('../../config');

const COMMUNITY_ROLE_TABLE = "communityroles";

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

function getCommunityRoles(domainName, done) {
  const query = `SELECT role, actions FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName}'`;// SORT BY domainname, role`;

  return client.execute(query, (err, results) => {
    if(!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

/*function getcommunityrole(callback) {
  const query = ('select * from communityroles');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}

function postcommunityrole(data, callback) {
  const query = ('INSERT INTO communityroles (domain,actions,role) VALUES (?, ?, ?)');
  const param = [data.domain, data.actions, data.role];
  return client.execute(query, param, { hints: ['text', 'map', 'text'] }, (err) => {
    callback(err);
  });
}

function patchcommunityrole(data, value, callback) {
  const query = ('UPDATE communityroles SET actions=actions+ ? where domain=? AND role=?');
  const param = [data.actions, value.domain, value.role];
  return client.execute(query, param, { hints: ['map', 'text', 'text'] }, (err) => {
    callback(err);
  });
}*/

module.exports = {
  getCommunityRoles
  /*getcommunityrole,
  postcommunityrole,
  patchcommunityrole*/ };

