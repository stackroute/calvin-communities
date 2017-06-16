const model = require('cassandra-driver');

const connectionString = require('../../connect');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

function getcommunityrole(callback) {
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
}

module.exports = { getcommunityrole, postcommunityrole, patchcommunityrole };
