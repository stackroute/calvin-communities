const model = require('cassandra-driver');

const connectionString = require('../../connect');
// connecting to cassandra
const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// query to select all values from counter table
function getcounter(callback) {
  const query = ('SELECT * from communities_counter');
  console.log('Got values!!');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}
// incrementing members
function incrementmember(data, callback) {
  const query = (`UPDATE communities_counter SET members_count = members_count + 1 where domain='${data.id}'`);
  console.log('updated member values!!');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}
// incrementing invitation
function incrementinvitation(data, callback) {
  const query = (`UPDATE communities_counter SET invitations_count = invitations_count + 1 where domain='${data.id}'`);
  console.log('updated invitation values!!');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}
// incrementing requests
function incrementrequests(data, callback) {
  const query = (`UPDATE communities_counter SET requests_count = requests_count + 1 where domain='${data.id}'`);
  console.log('updated requests_count values!!');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}
// incrementing tools
function incrementtools(data, callback) {
  const query = (`UPDATE communities_counter SET tools_count = tools_count + 1 where domain='${data.id}'`);
  console.log('updated tool values!!');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}
// function for decrementing tools
function decrementtools(data, callback) {
  const query = (`UPDATE communities_counter SET tools_count = tools_count - 1 where domain='${data.id}'`);
  console.log('updated tool values!!');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}
// function for decrementing request
function decrementrequests(data, callback) {
  const query = (`UPDATE communities_counter SET requests_count = requests_count - 1 where domain='${data.id}'`);
  console.log('updated tool values!!');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}
// function for decrementing members
function decrementmember(data, callback) {
  const query = (`UPDATE communities_counter SET members_count = members_count - 1 where domain='${data.id}'`);
  console.log('updated tool values!!');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}
// function for decrementing invitation
function decrementinvitation(data, callback) {
  const query = (`UPDATE communities_counter SET invitations_count = invitations_count - 1 where domain='${data.id}'`);
  console.log('updated tool values!!');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
}
module.exports = {
  incrementrequests,
  incrementinvitation,
  getcounter,
  incrementmember,
  incrementtools,
  decrementtools,
  decrementmember,
  decrementrequests,
  decrementinvitation,

};
