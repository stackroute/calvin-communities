require('body-parser');
const model = require('cassandra-driver');


const connectionString = require('../../config');
// getting all DB details from connect.js file placed in server directory
const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// service fetching all community details and returning a promise
function getallcommunities() {
  const query = ('select * from communities');
  return client.execute(query);
}

// service adding community details
function addcommunity(com) {
  const query = (`INSERT INTO communities (domain, name, status, template,tags, owner, 
description, avatar, poster, roles, createdby, createdon, updatedby, updatedon) 
VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , dateof(now()) , ?, dateof(now()) ) `);
  const param = [com.body.domain, com.body.name,
    com.body.status, com.body.template, com.body.tags,
    com.body.createdby, com.body.description,
    com.body.avatar, com.body.poster, com.body.roles,
    com.body.createdby, com.body.createdby];
  return client.execute(query, param);
}

// service for get specific community details from DB
function getcommunity(domainname) {
  const query = ('select * from communities where domain = ? ');
  return client.execute(query, [domainname]);
}

// to update data for a specific community
function updatecommunity(domainname, body) {
  const query = (`update communities set name = ? , description = ?, 
    status = ? , tags = ? , updatedby = ? , updatedon = dateof(now()) where domain = ? `);
  const param = [body.name, body.description, body.status,
    body.tags, body.updatedby, domainname];
  return client.execute(query, param);
}


module.exports = {
  getallcommunities,
  addcommunity,
  getcommunity,
  updatecommunity,

};
