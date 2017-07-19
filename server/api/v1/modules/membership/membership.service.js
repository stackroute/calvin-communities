const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const logger = require('../../../../logger');

const MEMBERSHIP_TABLE = 'membership';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


/*
 * Get community Details of a particular member
 */

function getCommunityList(username, done) {
  const query = `SELECT domain, role FROM membership WHERE username = '${username}' `;
  return client.execute(query, (err, results) => {
    if (!err) {
      console.log(results.rows)
      done(undefined, { username: username, communityDetails: results.rows });
    } else {
      done(err, undefined);
    }
  });
}

/*
 * Post - Add memebers to the community
 */

function userCommunityDetails(domainName, data, done) {
  const arr = [];
  const query = (`INSERT INTO ${MEMBERSHIP_TABLE} (username,domain,role,createdon,updatedon)
                  values(?,?,?,dateof(now()),dateof(now()))`);
  data.forEach((value) => {
    const user = value.username.toLowerCase();
    arr.push({ query, params: [user, domainName.toLowerCase(), value.role.toLowerCase()] });
  });

  logger.debug('Members added');
  return client.batch(arr, { prepare: true }, (err, res) => {
    if (err) {
      return done(err);
    }
    return done(null, res);
  });
}

/*
 *  Patch - Modify role of a member in a community
 */

function modifyRoleOfMemberInCommunity(domainName, data, done) {
  const arr = [];
  const query = (`UPDATE ${MEMBERSHIP_TABLE} SET role =? ,updatedon = dateof(now()) WHERE domain =? AND username =? `);
  data.forEach((val) => {
    arr.push({
      query,
      params: [val.role.toLowerCase(), domainName.toLowerCase(), val.username.toLowerCase()],
    });
  });
  return client.batch(arr, { prepare: true }, (err, res) => {
    if (err) {
      return done(err);
    }
    return done(undefined, res);
  });
}

/*
 * Delete- Remove member from a community
 */

function removeMemberFromCommunity(domainName, data, done) {
  /* const arr = [];
  const query = (`DELETE FROM ${MEMBERSHIP_TABLE} WHERE username =? AND domain = ? `);
  // console.log(data.length);
  // console.log(typeof (data));
  console.log(data);
  data.forEach((val) => {
    arr.push({ query, params: [val.username.toLowerCase(), domainName.toLowerCase()] });
  });
  return client.batch(arr, { prepare: true }, (err, res) => {
    if (err) {
      return done(err);
    }
    return done(undefined, res);
  });*/
}


module.exports = {
  userCommunityDetails,
  getCommunityList,
  modifyRoleOfMemberInCommunity,
  removeMemberFromCommunity,
};
