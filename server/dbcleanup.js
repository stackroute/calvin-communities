const model = require('cassandra-driver');
const async = require('async');
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
const TABLE_COMMUNITY_TOOL_EVENT_MAP = 'communitytooleventmap';
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


queries.push(`TRUNCATE TABLE ${KEYSPACE}.${TABLE_COMMUNITY_TOOL_EVENT_MAP}`);


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
 * truncation of tables
 */

function truncatetable(query, done) {
  client.execute(query, (err) => { // eslint-disable-line consistent-return
    if (err) {
      return done(err);
    }
    logger.debug('please wait', '.'.repeat(Math.floor((Math.random() * 10) + 1)));
    done();
  });
}

function truncatedb() {
  async.map(queries, truncatetable, (error) => { // eslint-disable-line consistent-return
    if (error) {
      return logger.debug('Error in truncatin database, please try again later...');
    }
    logger.debug('Database Truncated');
    process.exit();
  });
}

truncatedb();

module.exports = {
  truncatedb,
};
