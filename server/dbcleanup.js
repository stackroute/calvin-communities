const model = require('cassandra-driver');

const logger = require('log4js').getLogger();

const connectionString = require('./config').connectionString;

const client = new model.Client({
    contactPoints: [connectionString.contact],
});

/*
 * Defining table names
 */
const KEYSPACE = 'calvincommunity';
const TABLE_COMMUNITIES = 'communities';
const TABLE_COMMUNITY_MEMBERSHIP = 'communitymembership';
const TABLE_MEMBERSHIP = 'membership';
const TABLE_COMMUNITY_TOOLS = 'communitytools';
const TABLE_TOOLS = 'tools';
const TABLE_ROLES = 'communityroles';
const TABLE_REQUESTS = 'communityinviterequests';
const TABLE_COUNTER = 'communitiescounter';

const queries = [];


/**
 * Describing Table for Community
 */
queries.push(`TRUNCATE TABLE ${KEYSPACE}.${TABLE_COMMUNITIES}`);
/**
 * Describing Table for Community Memberships according to Community's perspective
 */
queries.push(`TRUNCATE TABLE ${KEYSPACE}.${TABLE_COMMUNITY_MEMBERSHIP}`);
/**
 * Describing Table for Memberships according to member's perspective
 */
queries.push(`TRUNCATE TABLE ${KEYSPACE}.${TABLE_MEMBERSHIP}`);

/**
 * Describing Table for Community Tools Data according to community's perspective
 */
queries.push(`TRUNCATE TABLE ${KEYSPACE}.${TABLE_COMMUNITY_TOOLS} `);
/**
 * Describing Table for Tools data according to tool's perspective
 */

queries.push(`TRUNCATE TABLE ${KEYSPACE}.${TABLE_TOOLS}`);

/**
 * Describing Table for Community Roles Data
 */

queries.push(`TRUNCATE TABLE ${KEYSPACE}.${TABLE_ROLES} `);
/**
 * Describing Table for Community Invites/ Requests Data
 */

queries.push(`TRUNCATE TABLE ${KEYSPACE}.${TABLE_REQUESTS}`);

/**
 * Describing Table for Counters for Community Data Tables
 */

queries.push(`TRUNCATE TABLE ${KEYSPACE}.${TABLE_COUNTER}`);

/**
 * KEYSPACE & TABLE Creation
 */
client.connect()
<<<<<<< HEAD
    .then(() => client.execute(queries[0]))
    .then(() => {
        logger.debug(`table ${TABLE_COMMUNITIES} cleared`);
        return client.execute(queries[1]);
    })
    .then(() => {
        logger.debug(`table ${TABLE_COMMUNITY_MEMBERSHIP} cleared`);
        return client.execute(queries[2]);
    })
    .then(() => {
        logger.debug(`table ${TABLE_MEMBERSHIP} cleared`);
        return client.execute(queries[3]);
    })
    .then(() => {
        logger.debug(`table ${TABLE_COMMUNITY_TOOLS} cleared`);
        return client.execute(queries[4]);
    })
    .then(() => {
        logger.debug(`table ${TABLE_TOOLS} cleared`);
        return client.execute(queries[5]);
    })
    .then(() => {
        logger.debug(`table ${TABLE_ROLES} cleared`);
        return client.execute(queries[6]);
    })
    .then(() => {
        logger.debug(`table ${TABLE_REQUESTS} cleared`);
        return client.execute(queries[7]);
    })
    .then(() => {
        logger.debug(`table ${TABLE_COUNTER} cleared`);
        client.shutdown();
        logger.debug('all required tables cleared');
        process.exit();
    })
    .catch((err) => {
        client.shutdown();
        logger.debug('error in Database operations:', err);
        process.exit();

    });
=======
.then(() => client.execute(queries[0]))
.then(() => {
  logger.debug(`table ${TABLE_COMMUNITIES} cleared`);
  return client.execute(queries[1]);
})
.then(() => {
  logger.debug(`table ${TABLE_COMMUNITY_MEMBERSHIP} cleared`);
  return client.execute(queries[2]);
})
.then(() => {
  logger.debug(`table ${TABLE_MEMBERSHIP} cleared`);
  return client.execute(queries[3]);
})
.then(() => {
  logger.debug(`table ${TABLE_COMMUNITY_TOOLS} cleared`);
  return client.execute(queries[4]);
})
.then(() => {
  logger.debug(`table ${TABLE_TOOLS} cleared`);
  return client.execute(queries[5]);
})
.then(() => {
  logger.debug(`table ${TABLE_ROLES} cleared`);
  return client.execute(queries[6]);
})
.then(() => {
  logger.debug(`table ${TABLE_REQUESTS} cleared`);
  return client.execute(queries[7]);
})
.then(() => {
  logger.debug(`table ${TABLE_COUNTER} cleared`);
  client.shutdown();
  logger.debug('all required tables cleared');
  process.exit();
})
.catch((err) => {
  client.shutdown();
  logger.debug('error in Database operations:', err);
  process.exit();
});

>>>>>>> c2b7730b69d62fac6fc7c288955702aec079b2da
