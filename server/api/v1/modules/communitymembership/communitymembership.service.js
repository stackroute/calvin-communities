const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const logger = require('../../../../logger');

const COMMUNITY_MEMBERSHIP_TABLE = 'communitymembership';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


function addMembersToCommunity(domainName, data, done) {
  const arr = [];
  const query = (`INSERT INTO ${COMMUNITY_MEMBERSHIP_TABLE} (username,domain,role,createdon,updatedon) values(?,?,?,dateof(now()),dateof(now()))`);
  data.forEach((val) => {
    arr.push({ query, params: [val.username, domainName.toLowerCase(), val.role.toLowerCase()] });
  });
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      logger.debug('no error');
      done(undefined);
    } else {
      logger.debug(err);
      done(err);
    }
  });
}

function removeMembersFromCommunity(domainName, data, done) {
  logger.debug('hi');
  const arr = [];
  const query = (`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE username =? AND domain = ?  IF EXISTS`);
  data.forEach((val) => {
    arr.push({ query, params: [val.username, domainName.toLowerCase()] });
  });
  return client.batch(arr, { prepare: true }, (err) => {
    if (!err) {
      logger.debug('no error');
      done({ message: 'Deleted' });
    } else {
      logger.debug(err);
      done(err);
    }
  });
}


// Update role of members in a community

function modifyRoleOfMembersFromCommunity(domainName, data, done) {
  logger.debug('you can modify role');
  const arr = [];
  const query = (`UPDATE ${COMMUNITY_MEMBERSHIP_TABLE} SET role =? ,updatedon = dateof(now()) WHERE domain =? AND username =? IF EXISTS `);
  data.forEach((val) => {
    arr.push({ query, params: [val.role.toLowerCase(), domainName.toLowerCase(), val.username] });
  });
  logger.debug(query);
  return client.batch(arr, { prepare: true }, (err, message) => {
    logger.debug(query);
    if (!err) {
      logger.debug('no error');
      done(undefined, message);
    } else {
      logger.debug(err);
      done(err, undefined);
    }
  });
}


// Get particular Community members
function checkCommunityToUpdateMembersDetail(domainName, userName, memberRole, done) {
  const query = `SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain = '${domainName.toLowerCase()}' AND username = '${userName}' AND role='${memberRole.toLowerCase()}' ALLOW FILTERING`;
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


// Get particular Community members Details


function getParticularCommunityMembersDetails(domainName, done) {
  const query = `SELECT username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain = '${domainName.toLowerCase()}' `;
  logger.debug(query);
  return client.execute(query, (err, results) => {
    logger.debug(query);
    if (!err) {
      done(undefined, { domain: domainName, MemberDetails: results.rows });
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
  checkCommunityToUpdateMembersDetail,
};
