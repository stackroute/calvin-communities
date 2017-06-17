const model = require('cassandra-driver');

const connectionString = require('../../../../config');

const COMMUNITY_MEMBERSHIP_TABLE = 'membership';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


function getParticularMemberDetailInCommunities(userName, done) {
  const query = `SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} where username = '${userName}' ALLOW FILTERING`;
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

/* function addMemberToCommunity(data, callback) {
  const query = (`insert into membership(username,domain,role) values('${data.username}','${data.domain}','${data.role}')`);
  client.execute(query, err => callback(err));
}

function getAllMembersInCommunities(params, callback) {
  const query = ('select * from membership');

 client.execute(query, (err, data) => callback(err, data.rows));
}

function getParticularMemberDetailInCommunities(params, callback) {
  const query = (`select * from membership where username = '${params.username}' ALLOW FILTERING`);

 client.execute(query, (err, data) => callback(err, data.rows));
}

function getParticularCommunityMemberDetails(params, callback) {
  const query = (`select * from membership where domain = '${params.domain}' `);
  client.execute(query, (err, data) => callback(err, data));
}

function getAllCommunity(params, callback) {
  const query = ('select domain from membership');
  client.execute(query, (err, data) => callback(err, data.rows));
}

function deleteParticularCommunity(data, callback) {
  const query = (`delete from membership where domain = '${data.domain}' `);
  client.execute(query, err => callback(err));
}

function deleteParticularMemberFromCommunity(params, callback) {
  const query = (`delete from membership where domain = '${params.domain}' AND username ='${params.username}' `);
  client.execute(query, err => callback(err));
}

function modifyRoleOfMemberFromCommunity(params, callback) {
  const query = (`update membership set role = '${params.role}' where domain = '${params.domain}' AND username ='${params.username}' IF EXISTS `);
  client.execute(query, (err, data) => {
   let a = data.rows[0];
   console.log(a);
   let b = a.
    callback(err, data.rows)});
}*/

module.exports = {
  // addMemberToCommunity, // Add member to the community
  // getAllMembersInCommunities, // get All members
  getParticularMemberDetailInCommunities, // get particular member with all community details
  /*getParticularCommunityMemberDetails, // get particular Domain members
  getAllCommunity, // get all domain
  deleteParticularCommunity, // delete particular domain
  deleteParticularMemberFromCommunity, // delete member from community
  modifyRoleOfMemberFromCommunity, // modify role to a member in a community*/
};