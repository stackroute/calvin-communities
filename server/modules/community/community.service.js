require('body-parser');
const model = require('cassandra-driver');


const connectionString = require('../../connect');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


function getallcommunities() {
  const query = ('select * from communities');
  return client.execute(query);
}

function addcommunity(com) {
  const query = (`INSERT INTO communities (domain, name, status, template,tags, owner,
  	description, avatar, poster, roles, createdby, createdon, updatedby, updatedon) 
  	VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , dateof(now()) , ?, dateof(now()) ) `);
  const param = [com.body.domain, com.body.name,
    com.body.status, com.body.template, com.body.tags,
    com.body.createdby, com.body.description,
    com.body.avatar, com.body.poster, com.body.roles,
    com.body.createdby, com.body.createdby];
  return client.execute(query, param, { hints: ['text', 'text', 'text', 'text', 'set',
    'text', 'text', 'text', 'text', 'map', 'text', 'text'] });
}

function getcommunity(domainname) {
  const query = ('select * from communities where domain = ? ');
  return client.execute(query, [domainname]);
}


module.exports = {
  getallcommunities,
  addcommunity,
  getcommunity,

};
