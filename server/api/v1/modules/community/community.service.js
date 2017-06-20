const model = require('cassandra-driver');

const tableCommunities = 'communities';

/**
 * config details from config.js
 *
 *
 */

const connectionString = require('../../../../config');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

/**
 * GET For all communities
 *
 *
 */
function getAllCommunities(done) {
  const query = `SELECT * FROM ${tableCommunities}`;
  return client.execute(query, (err, results) => {
    if (err) done(err, undefined);
    done(err, results.rows);
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
    if (err) done(err, undefined);
    done(err, results.rows);
  });
}

/**
 * POST a communities
 *
 *
 */
function addCommunity(param, done) {
  const query = (`INSERT INTO ${tableCommunities} (domain, name, purpose, visibility, template,tags, owner, \
description, avatar, createdby, createdon, updatedby, updatedon) \
VALUES ( ? , ? , ? , ? , ?  , ? , ? , ? , ? , ? , dateof(now()) , ? , dateof(now()) ) `);


  return client.execute(query, param, (err, results) => {
    if (err) done(err, undefined);
    getCommunity(param[0], done);
  });
}

/**
 * update a community
 *
 *
 */
function updateCommunity(param, done) {
  const query = (`UPDATE ${tableCommunities} SET name = ? , avatar = ? , description = ?, \
    visibility = ? , tags = ? , updatedby = ? , updatedon = dateof(now()) where domain = ? `);

  return client.execute(query, param, (err, results) => {
    if (err) done(err, undefined);
    getCommunity(param[6], done);
  });
}


module.exports = {
  getAllCommunities,
  addCommunity,
  getCommunity,
  updateCommunity,

};
