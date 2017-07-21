const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;
// connecting to cassandra
const COMMUNITIES_COUNTER_TABLE = 'communitiescounter';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

function getcounter(domain, done) {
  const query = `SELECT * FROM ${COMMUNITIES_COUNTER_TABLE} WHERE domain='${domain}'`;
  return client.execute(query, (err, result) => {
    if (err) {
      done(err, null);
      return;
    }
    done(null, result.rows);
  });
}

function incrementmember(domain, payload, done) {
  console.log('incrementmember', payload);
  const query = `UPDATE ${COMMUNITIES_COUNTER_TABLE} SET members = members + ${payload} WHERE domain='${domain}'`;
  return client.execute(query, (err, result) => {
    if (!err) {
      console.log('counter service', result);
      done(null, result);
    } else {
      done(err, undefined);
    }
  });
}

function incrementinvitation(domain, payload, done) {
  console.log("invitations ", payload);
  const query = `UPDATE ${COMMUNITIES_COUNTER_TABLE} SET invitations = invitations + ${payload} WHERE domain = '${domain}'`;
  console.log(query)
  return client.execute(query, (err, result) => {
    if (!err) {
      console.log("counterservices:", result);
      done(null, result);
    } else {
      console.log("countererror", err);
      done(err, undefined);
    }
  });
}

function incrementrequests(domain, payload, done) {
  const query = `UPDATE ${COMMUNITIES_COUNTER_TABLE} SET requests = requests + ${payload} WHERE domain='${domain}'`;
  return client.execute(query, (err, result) => {
    if (!err) {
      done(null, result);
    } else {
      done(err, undefined);
    }
  });
}

function incrementtools(domain, payload, done) {
  console.log("tools",payload);
  console.log('payss', payload);
  const query = `UPDATE ${COMMUNITIES_COUNTER_TABLE} SET tools = tools + ${payload} WHERE domain='${domain}'`;
  return client.execute(query, (err, result) => {
    if (!err) {
      done(null, result);
    } else {
      done(err, undefined);
    }
  });
}

function decrementrequests(domain, payload, done) {
  const query = `UPDATE ${COMMUNITIES_COUNTER_TABLE} SET requests = requests - ${payload} WHERE domain='${domain}'`;
  return client.execute(query, (err, result) => {
    if (!err) {
      done(null, result);
    } else {
      done(err, undefined);
    }
  });
}

function decrementmember(domain, payload, done) {
  console.log('decrementmember', payload);
  const query = `UPDATE ${COMMUNITIES_COUNTER_TABLE} SET members = members - ${payload} WHERE domain='${domain}'`;
  return client.execute(query, (err, result) => {
    if (!err) {
      console.log('counter service', result);
      done(null, result);
    } else {
      done(err, undefined);
    }
  });
}

function decrementinvitation(domain, payload, done) {
  const query = `UPDATE ${COMMUNITIES_COUNTER_TABLE} SET invitations = invitations - ${payload} WHERE domain='${domain}'`;
  return client.execute(query, (err, result) => {
    if (!err) {
      done(null, result);
    } else {
      done(err, undefined);
    }
  });
}

function decrementtools(domain, payload, done) {
  const query = `UPDATE ${COMMUNITIES_COUNTER_TABLE} SET tools = tools - ${payload} WHERE domain='${domain}'`;
  return client.execute(query, (err, result) => {
    if (!err) {
      done(null, result);
    } else {
      done(err, undefined);
    }
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

