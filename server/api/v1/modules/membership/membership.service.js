const model = require('cassandra-driver');


const connectionString = require('../../../../config').connectionString;

const MEMBERSHIP_TABLE = 'membership';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

// Insert in to membership table
function addMemberToCommunity(params, done) {
  const query = (`INSERT INTO ${MEMBERSHIP_TABLE} (username, domain, role, createdon, updatedon)
      values('${params.username}', '${params.domain}', '${params.role}', dateof(now()), dateof(now()))`);
  return client.batch(query, { prepare: true }, (err) => {
    if (!err) {
      done(undefined, { message: 'added member details' });
    } else {
      done({ error: 'Unexpected internal server error...' }, undefined);
    }
  });
}


  // Get community details of a particular member
function getCommunityList(username, done) {
  const query = `SELECT domain,role FROM ${MEMBERSHIP_TABLE} WHERE username = '${username.toLowerCase()}' `;
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
          // console.log(results.rows);
        done(undefined, { user: username, domain: results.rows });
      } else {
        done({ error: 'please enter a valid username' }, undefined);
      }
    } else {
      done(err, undefined);
    }
  });
}

  // Modify role of a member in a community
function modifyRoleInCommunity(params, memberRole, done) {
  const query = (`UPDATE ${MEMBERSHIP_TABLE} SET role = '${memberRole}' WHERE domain = '${params.domainName}' AND username ='${params.username}'`);
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, results);
    } else {
      done(err, undefined);
    }
  });
}

  // Remove member from the community
function deleteMemberFromCommunity(params, done) {
  const query = (`DELETE FROM ${MEMBERSHIP_TABLE} WHERE domain = '${params.domainName}' AND username ='${params.userName}'`);
  return client.execute(query, (err) => {
    if (!err) {
      done(undefined, { message: 'member got deleted' });
    } else {
      done(err, undefined);
    }
  });
}

module.exports = {
  addMemberToCommunity,
  getCommunityList,
  modifyRoleInCommunity,
  deleteMemberFromCommunity,
};
