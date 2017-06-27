const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const MEMBERSHIP_TABLE = 'membership';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Add member to the community
function addedMemberToCommunity(params, done) {
  const query = (`INSERT INTO ${MEMBERSHIP_TABLE} (username,domain,role) values('${params.userName}','${params.domainName}','${params.role}')`);
  return client.execute(query, (err) => {
    if (err) {
      done(err);
    } else {
      done();
    }
  });
}

// Get particular member with all community details
function getParticularMemberDetailInCommunities(userName, done) {
  const query = `SELECT domain,role FROM ${MEMBERSHIP_TABLE} WHERE username = '${userName}' `;
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
  const query = (`UPDATE ${MEMBERSHIP_TABLE} SET role = '${memberRole}' WHERE domain = '${params.domainName}' AND username ='${params.userName}' IF EXISTS `);
  return client.execute(query, (err) => {
    if (!err) {
      done(err);
    } else {
      done(err);
    }
  });
}

// Remove member from the community
function removeMemberFromCommunity(params, done) {
  const query = (`DELETE FROM ${MEMBERSHIP_TABLE} WHERE domain = '${params.domainName}' AND username ='${params.userName}' IF EXISTS`);
  return client.execute(query, (err) => {
    if (!err) {
      done(err);
    } else {
      done(err);
    }
  });
}

module.exports = {
  addedMemberToCommunity,
  getParticularMemberDetailInCommunities,
  modifyRoleOfMemberFromCommunity,
  removeMemberFromCommunity,
};
