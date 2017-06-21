const model = require('cassandra-driver');

const connectionString = require('../../../../config');

const InviteRequestTable = 'memberrequest';


const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Query for insert the values into the row

function InsertData(data, done) {
  const person = data.person;
  let error;
  let res;

  person.forEach((email) => {
    const query = (`INSERT INTO ${InviteRequestTable} (domain,person,member,status,type,createdon,updatedon) VALUES('${data.domain.toLowerCase()}','${email.toLowerCase()}','${data.member.toLowerCase()}','${data.status.toLowerCase()}','${data.type.toLowerCase()}',dateof(now()),dateof(now()))`);
    client.execute(query, (err, result) => {
      error += err;
      res += result;
    });
  });
  done(error, res);
}


// Query for delete the row for rejected invite or request

function rejectedInviteRequest(domain, person, done) {
  const query = (`DELETE from ${InviteRequestTable} WHERE domain = '${domain}' AND person = '${person}' `);
  client.execute(query, err => done(err));
}

// Query for get the values for particular domain and person

function gettingValuesByDomainPerson(domain, person, done) {
  const query = (`SELECT * FROM ${InviteRequestTable} WHERE domain = '${domain}' AND person = '${person}' `);
  return client.execute(query, (err, result) => {
    if (!err) {
      done(err, result.rows);
    } else {
      done('please enter valid name!!', undefined);
    }
  });
}


// Query for get the values for particular domain

function gettingValuesByDomain(domain, done) {
  const query = (`SELECT * FROM ${InviteRequestTable} WHERE domain = '${domain}' `);

  return client.execute(query, (err, result) => {
    if (!err) {
      if (result.rows.length > 0) {
        done(undefined, result.rows);
      } else {
        done('please enter valid domain name', undefined);
      }
    } else {
      done(err, undefined);
    }
  });
}


// Query for Update status for type request

function statusUpdateRequest(domain, person, bodyData, done) {
  const status = bodyData.status.toLowerCase();
  const member = bodyData.member.toLowerCase();
  const query = (`UPDATE ${InviteRequestTable} SET status = '${status}',member = '${member}',updatedon=dateof(now()) WHERE domain = '${domain}' AND person = '${person}'`);
  client.execute(query, err => done(err));
}

// Query for update status for type invite

function statusUpdateInvite(domain, person, bodyData, done) {
  const status = bodyData.status.toLowerCase();
  const query = (`UPDATE ${InviteRequestTable} SET status = '${status}',updatedon=dateof(now()) WHERE domain = '${domain}' AND person = '${person}'`);
  client.execute(query, err => done(err));
}


module.exports = {
  gettingValuesByDomainPerson,
  InsertData,
  statusUpdateRequest,
  statusUpdateInvite,
  rejectedInviteRequest,
  gettingValuesByDomain,
};
