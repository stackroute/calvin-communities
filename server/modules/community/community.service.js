const model = require('cassandra-driver');


/**
 * config details from config.js
 *
 *
 */
const connectionString = require('../../config');
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
function getallcommunities(done) {

    const query = `select * from communities`;
    return client.execute(query, (err, results) => {
        if (err) done(err, undefined);
        done(err, results.rows);

    });
}

/**
 * POST a communities
 *
 *
 */
function addcommunity(param, done) {
    const query = (`INSERT INTO communities (domain, name, status, template,tags, owner, \
description, avatar, poster, roles, createdby, createdon, updatedby, updatedon) \
VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , dateof(now()) , ?, dateof(now()) ) `);


    return client.execute(query, param, (err, results) => {
        if (err) done(err, undefined);
        done(err, results);
    })

}

/**
 * GET For specific community
 *
 *
 */
function getcommunity(domainname, done) {
    const query = `select * from communities where domain = ? `;
    return client.execute(query, [domainname], (err, results) => {
        if (err) done(err, undefined);
        done(err, results.rows);
    });
}

/**
 * update a community
 *
 *
 */
function updatecommunity(param, done) {
    const query = (`update communities set name = ? , description = ?, \
    status = ? , tags = ? , updatedby = ? , updatedon = dateof(now()) where domain = ? `);

    return client.execute(query, param, (err, results) => {
        if (err) done(err, undefined);
        done(err, results);
    });
}


module.exports = {
    getallcommunities,
    addcommunity,
    getcommunity,
    updatecommunity,

};
