const model = require('cassandra-driver');

const connectionString = require('../../config');
const Invite_Request_Table = "invite_request";


const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

  // Query for insert

function InsertData(data, done) {
  const query = (`insert into invite_request (id,email,domain,type,status,approver) values('${data.id}','${data.email}','${data.domain}','${data.type}','${data.status}','${data.approver}')`);
  client.execute(query, err => done(err));
}


/*
// Query for Update status for type request

function update(data, callback) {
  const query = (`update invite_request set status = '${data.status}',approver = '${data.approver}' where id = '${data.id}'`);
  client.execute(query, (err, result) => callback(err, result));
}

// Query for update status for type invite

function statusupdate(data, callback) {
  const query = (`update invite_request set status = '${data.status}' where id = '${data.id}'`);
  client.execute(query, (err, result) => callback(err, result));
}

// Query for delete the rejected invite or request

function rejected(data, callback) {
  const query = (`delete from invite_request where id = '${data.id}' IF EXISTS`);

  client.execute(query, err => callback(err));
}

// Query for Get

function getMember(callback) {
  const query = ('SELECT * from invite_request');
  return client.execute(query, (err, result) => {
    callback(err, result);
  });
} */


// Query for get the values for particular id

function gettingValuesById(data, callback) {
  const query = (`SELECT * from ${Invite_Request_Table} WHERE id= '${data.id}' `); 

  return client.execute(query, (err, result) => {
    if(!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}


module.exports = {
 /* insert,
  update,
  statusupdate,
  rejected,
  getMember,
  getMemberById,*/
gettingValuesById,
InsertData
};

