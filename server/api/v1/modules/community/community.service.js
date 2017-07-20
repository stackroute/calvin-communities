const model = require('cassandra-driver');
const _ = require('lodash');
const logger = require('../../../../logger');

const tableCommunities = 'communities';

/**
 * db config details from config.js
 *
 *
 */

const connectionString = require('../../../../config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

function array2string(domains) {
  let stringed = "'";
  domains.forEach((data) => {
    stringed += `${data.toLowerCase().toString()}','`;
  });
  stringed = (stringed.substr(0, stringed.length - 2));
  logger.debug('After Conversion', stringed);
  return stringed;
}

/**
 * GET For all communities
 *
 *
 */
function getAllCommunities(done) {
  const query = `SELECT * FROM ${tableCommunities}`;
  return client.execute(query, (err, results) => {
    if (err) { logger.debug(err); return done([500, 'Internal server error']); }
    return done(err, results.rows);
  });
}

/**
* GET for multiple specified communities
*
*
*/
function getMultipleCommunities(domains, done) {
  const stringed = array2string(domains);

  const query = `SELECT * FROM ${tableCommunities} where DOMAIN in (${stringed})`;
  return client.execute(query, (err, results) => {
    if (err) { logger.debug(err); return done([500, 'Internal server error']); }
    if (results.rows.length === domains.length) { return done(undefined, results.rows); }
    return done('Please give correct domains');
  });
}

/**
 * GET For specific community
 *
 *
 */
function getCommunity(domainname, done) {
  const query = `SELECT * FROM ${tableCommunities} WHERE domain = ? `;
  return client.execute(query, [domainname], (err, results) => {
    if (err) { logger.debug(err); return done([500, 'Internal server error']); }
    return done(undefined, results.rows);
  });
}

/**
 * POST a communities
 *
 *
 */
function addCommunity(param, done) {
  const query = (`INSERT INTO ${tableCommunities} (domain, name, avatar, purpose,\
   status, template, tags, owner, \
description, visibility , createdby, updatedby, createdon, updatedon) \
VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ,  ? , dateof(now()) , dateof(now()) ) `);

  return client.execute(query, param, (err) => {
    if (err) { logger.debug(err); return done([500, 'Internal server error']); }
    return getCommunity(param[0], done);
  });
}
/**
 * update a community
 *
 *
 */
function updateCommunity(param, done) {
  /* const query = (`UPDATE ${tableCommunities} SET name = ? , avatar = ? , description = ?, \
    visibility = ? , tags = ? , updatedby = ? ,
    status = ? , updatedon = dateof(now()) where domain = ? `);
*/
  const query = (`UPDATE ${tableCommunities} SET name = ? , avatar = ? , description = ?, \
    visibility = ? , tags = ? , updatedby = ? , updatedon = dateof(now()) where domain = ? `);

  return client.execute(`SELECT * FROM ${tableCommunities} where domain = ?`, [param[6]], (error, data) => {
    if (error) return done([500, 'Unexpected Error Occured']);
    if (!_.isEmpty(data.rows)) {
      return client.execute(query, param, (err) => {
        if (err) { logger.debug(err); return done([500, 'Internal server error']); }
        return getCommunity(param[6], done);
      });
    } return done([400, 'Domain Doesn\'t Exist'], undefined);
  });
}

/**
* delete a community
*
*
*/
function deleteCommunity(domain, done) {
  const query = (`DELETE FROM ${tableCommunities} where  domain = ? `);
  return getCommunity(domain, (error, result) => {
    if (error) { return done(error); }
    if (_.isEmpty(result)) { return done('Nothing to Delete'); }

    return client.execute(query, [domain], (err) => {
      if (err) { logger.debug(err); return done([500, 'Internal server error']); }
      return done(undefined, 'Deleted');
    });
  });
}


module.exports = {
  getAllCommunities,
  getMultipleCommunities,
  addCommunity,
  getCommunity,
  updateCommunity,
  deleteCommunity,

};
