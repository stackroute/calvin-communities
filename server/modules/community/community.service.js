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
function getallcommunities(done) {
  const query = `select * from communities`;
 return client.execute(query, (err, results) => {
    if(err) done(err, undefined);
    done(err, results.rows);
    
  });
}

// service adding community details
function addcommunity(param, done) {
  const query = (`INSERT INTO communities (domain, name, status, template,tags, owner, \
description, avatar, poster, roles, createdby, createdon, updatedby, updatedon) \
VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , dateof(now()) , ?, dateof(now()) ) `);
  
  return client.execute(query, param, (err, results) => {
    if(err) done(err, undefined);
    done(err, results.rows);
  })
}

// service for get specific community details from DB
function getcommunity(domainname, done) {
  const query = `select * from communities where domain = ? `;
  return client.execute(query, [domainname], (err, results) => {
    if(err) done(err, undefined);
    done(err, results.rows);
  });
}

// to update data for a specific community
function updatecommunity(community, done) {
  const query = (`update communities set name = ? , description = ?, \
    status = ? , tags = ? , updatedby = ? , updatedon = dateof(now()) where domain = ? `);
  
  return client.execute(query, community, (err, results) => {
    if(err) done(err, undefined);
    done(err, results.rows);
  });
}


module.exports = {
  getallcommunities,
  addcommunity,
  getcommunity,
  updatecommunity,

};
