const model = require('cassandra-driver');

const connectionString = require('../../../../config');

const COMMUNITY_MEMBERSHIP_TABLE = 'communitymembership';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Add member to the community
function addMemberToCommunity(params, done) {
  const query = (`INSERT INTO ${COMMUNITY_MEMBERSHIP_TABLE} (username,domain,role) values('${params.userName}','${params.domainName}','${params.role}')`);
  return client.execute(query, err => {
    if(err){
      done(err);
    }else{
      done();
    }
  });
}

// Get particular member with all community details
function getParticularMemberDetailInCommunities(userName, done) {
  const query = `SELECT domain,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} where username = '${userName}' ALLOW FILTERING`;
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

// Get particular Community members Details
function getParticularCommunityMemberDetails(domainName, done) {
  const query = `SELECT username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain = '${domainName}' ALLOW FILTERING`;
  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}


// Modify role of a member in a community
function modifyRoleOfMemberFromCommunity(params, memberRole, done) {
  const query = (`UPDATE ${COMMUNITY_MEMBERSHIP_TABLE} SET role = '${memberRole}' where domain = '${params.domainName}' AND username ='${params.userName}' IF EXISTS `);
  return client.execute(query, err => {
    console.log(query);
    if(!err){
      done(err);
    }else{
      done(err);
    }
  });
}

module.exports = {
  addMemberToCommunity, 
  getParticularMemberDetailInCommunities,
  getParticularCommunityMemberDetails,
  modifyRoleOfMemberFromCommunity,
};
