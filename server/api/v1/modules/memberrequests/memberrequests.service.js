const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const InviteRequestTable = 'communityinviterequests';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Query for insert the values into the row

function InsertDataInvite(data, dataFromParams, status, type, done) {
  const persons = data.invitee;
  const arr = [];
  const query = (`INSERT INTO ${InviteRequestTable} (domain,role,person,invitedby,status,type,createdon) VALUES(?,?,?,?,?,?,dateof(now()))`);
  persons.forEach((emailandrole) => {
    const person = emailandrole.email.toLowerCase();
    const role = emailandrole.role.toLowerCase();
    arr.push({
      query,
      params: [dataFromParams.toLowerCase(),
        role, person, data.invitedby.toLowerCase(), status.toLowerCase(), type.toLowerCase(),
      ],
    });
  });
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      done(undefined, { message: 'Inserted' });
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}


function InsertDataRequest(data, dataFromParams, status, type, done) {
  const person = data.invitee;
  const query = (`INSERT INTO ${InviteRequestTable} (domain,person,status,type,createdon) VALUES('${dataFromParams.toLowerCase()}','${person.toLowerCase()}','${status.toLowerCase()}','${type.toLowerCase()}',dateof(now()))`);
  return client.execute(query, (err) => {
    if (!err) {
      done(undefined, { message: 'Inserted' });
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}

//Query for delete the row for rejected invite or request

function rejectedInviteOrRequest(domain, person, done) {
  const query = (`DELETE from ${InviteRequestTable} WHERE domain = '${domain}' AND person = '${person}' `);
  return client.execute(query, (err) => {
    if (!err) {
      done(undefined);
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}

//Query for get the values for particular domain and person

function gettingValuesByDomainAndPerson(domain, person, done) {
  const query = (`SELECT * FROM ${InviteRequestTable} WHERE domain = '${domain}' AND person = '${person}' `);
  return client.execute(query, (err, result) => {
    if (!err) {
      done(err, result.rows);
    } else {
      done('please enter valid name!!', undefined);
    }
  });
}

//Query for get the values for particular domain

function gettingValuesByDomain(domain, done) {
  const query = (`SELECT * FROM ${InviteRequestTable} WHERE domain = '${domain}' `);
  return client.execute(query, (err, result) => {
    if (!err) {
      if (result.rows.length > 0) {
        done(undefined, { domain, requests: result.rows });
      } else {
        done({ error: 'please enter a valid domain name' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}

//Query for Update status for type request

function updateStatusForRequest(domain, person, bodyData, statuss, done) {
  const status = statuss.toLowerCase();
  const invitedby = bodyData.invitedby.toLowerCase();
  const role = bodyData.role.toLowerCase();
  const query = (`UPDATE ${InviteRequestTable} SET role = '${role}',status = '${status}',invitedby = '${invitedby}',updatedon=dateof(now()) WHERE domain = '${domain}' AND person = '${person}'`);
  client.execute(query, err => done(err));
}

//Query for update status for type invite

function updateStatusForInvite(domain, person, statuss, done) {
  const status = statuss.toLowerCase();
  const query = (`UPDATE ${InviteRequestTable} SET status = '${status}',updatedon=dateof(now()) WHERE domain = '${domain}' AND person = '${person}'`);
  client.execute(query, err => done(err));
}

module.exports = {
  gettingValuesByDomainAndPerson,
  InsertDataInvite,
  InsertDataRequest,
  updateStatusForRequest,
  updateStatusForInvite,
  rejectedInviteOrRequest,
  gettingValuesByDomain,
};
