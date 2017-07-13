const model = require('cassandra-driver');

/*
 * db config details from config.js
 */

const connectionString = require('../../../../config').connectionString;

const logger = require('../../../../logger');

const COMMUNITY_MEMBERSHIP_TABLE = 'communitymembership';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

/*
 *POST Method - Add memebers to the community
 */

function addMembersToCommunity(domainName, data, done) {
  const arr = [];
  const query = (`INSERT INTO ${COMMUNITY_MEMBERSHIP_TABLE} (username,domain,role,createdon,updatedon) values(?,?,?,dateof(now()),dateof(now()))`);
  data.forEach((val) => {
    arr.push({
      query, params: [val.username.toLowerCase(), domainName.toLowerCase(), val.role.toLowerCase()],
    });
  });
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      done(null);
    } else {
      done(err);
    }
  });
}

/*
 *DELETE Method - Remove members from a community
 */

function removeMembersFromCommunity(domainName, data, done) {
  const arr = [];
  const query = (`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE username =? AND domain = ?  IF EXISTS`);
  data.forEach((val) => {
    arr.push({ query, params: [val.username.toLowerCase(), domainName.toLowerCase()] });
  });
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      logger.debug('Member deleted');
      done(undefined);
    } else {
      done(err);
    }
  });
}


/*
 *PATCH Method- Modify role of a members in a community
 */

function modifyRoleOfMembersFromCommunity(domainName, data, done) {
  const arr = [];
  const query = (`UPDATE ${COMMUNITY_MEMBERSHIP_TABLE} SET role =? ,updatedon = dateof(now()) WHERE domain =? AND username =? IF EXISTS `);
  data.forEach((val) => {
    arr.push({
      query, params: [val.role.toLowerCase(), domainName.toLowerCase(), val.username.toLowerCase()],
    });
  });
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      logger.debug('Role modified');
      done(null);
    } else {
      done(err);
    }
  });
}


/*
 *get particular Community members Detail to check user availability
 */

function checkCommunityToUpdateMembersDetails(domainName, userName, done) {
  const query = `SELECT domain,username FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain = '${domainName.toLowerCase()}' AND username = '${userName.toLowerCase()}' `;
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        done(undefined, { message: 'User Exist you can modify the data' });
      } else {
        done({ error: 'Please enter a valid domain and username name' }, undefined);
      }
    } else {
      done({ error: 'Internal Error occured' }, undefined);
    }
  });
}

/*
 *GET Method - get particular Community members Detail
 */

function getParticularCommunityMembersDetails(domainName, done) {
  const query = `SELECT username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain = '${domainName.toLowerCase()}' `;
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        logger.debug('Member details received');
        done(undefined, { domain: domainName.toLowerCase(), MemberDetails: results.rows });
      } else {
        done({ error: 'please enter a valid domain' }, undefined);
      }
    } else {
      done(err, undefined);
    }
  });
}

module.exports = {
  addMembersToCommunity,
  removeMembersFromCommunity,
  modifyRoleOfMembersFromCommunity,
  getParticularCommunityMembersDetails,
  checkCommunityToUpdateMembersDetails,
};
