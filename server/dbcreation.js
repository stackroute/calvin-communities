const model = require('cassandra-driver');
const logger = require('log4js').getLogger();
const async = require('async');
const connectionString = require('./config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
});

/*
 * Defining keyspace and table names
 */
const KEYSPACE = [connectionString.keyspace];
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
queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_COMMUNITIES} ( \
  domain text, \
  purpose text, \
  visibility text, \
  avatar text, \
  createdby text, \
  createdon timestamp, \
  description text, \
  name text, \
  owner text, \
  status text, \
  tags set<text>, \
  template text, \
  updatedby text, \
  updatedon timestamp, \
   PRIMARY KEY (domain)
);`);

/**
 * Describing Table for Community Memberships according to Community's perspective
 */
queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_COMMUNITY_MEMBERSHIP} ( \
  domain text, \
  username text, \
  role text, \
  createdon timestamp, \
  updatedon timestamp, \
  PRIMARY KEY (domain, username)
  )`);

/**
 * Describing Table for Memberships according to member's perspective
 */
queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_MEMBERSHIP} ( \
  domain text, \
  username text, \
  role text, \
  createdon timestamp, \
  updatedon timestamp, \
  PRIMARY KEY (username, domain)
  )`);

/**
 * Describing Table for Community Tools Data according to community's perspective
 */
queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_COMMUNITY_TOOLS} ( \
  domain text, \
  toolid text, \
  toolname text, \
  avatar text, \
  toolurl text, \
  actions set<text>, \
  createdon timestamp, \
  updatedon timestamp, \
  purpose text, \
  PRIMARY KEY (domain, toolid)
)`);

/**
 * Describing Table for Community Tool Event to Community Activity Event Mapping
 * Subscribed events of a tool for a specific community
 */

queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_COMMUNITY_TOOL_EVENT_MAP} ( \
  domain text, \
  toolid text, \
  eventid text, \
  eventname text, \
  description text, \
  activity text, \
  actor text, \
  object text, \
  metadata text, \
  PRIMARY KEY (domain, toolid, eventid)
  )`);

/**
 * Describing Table for Tools data according to tool's perspective
 */

queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_TOOLS} ( \
  domains set<text>, \
  toolid text, \
  toolname text, \
  avatar text, \
  PRIMARY KEY(toolid)
)`);

/**
 * Describing Table for Community Roles Data
 */

queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_ROLES} ( \
  domain text, \
  role text, \
  toolid text, \
  actions map<text, text>, \
  createdon timestamp, \
  updatedon timestamp, \
  PRIMARY KEY (domain, role, toolid)
  )`);

/**
 * Describing Table for Community Invites/ Requests Data
 */

queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_REQUESTS} ( \
  domain text, \
  role text, \
  type text, \
  status text , \
  person text, \
  invitedBy text, \
  createdon timestamp, \
  updatedon timestamp, \
  PRIMARY KEY(domain, person)
  )`);

/**
 * Describing Table for Counters for Community Data Tables
 */

queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_COUNTER} ( \
  domain text, \
  invitations counter, \
  members counter, \
  requests counter, \
  tools counter, \
  PRIMARY KEY (domain)
  )`);

function dboperations(query, done) {
  client.execute(query, (error) => {
    if (error) {
      return done(error);
    }
    logger.debug('please wait', '.'.repeat(Math.floor((Math.random() * 10) + 1)));
    return done(undefined, undefined);
  });
}

function keyspaceCreation(done) {
  /**
   * Describing & creating keyspace
   */
  client.execute(`CREATE KEYSPACE IF NOT EXISTS ${KEYSPACE} WITH replication = \
  {'class': 'SimpleStrategy', 'replication_factor': '1'} \
 `, (err) => {
    if (err) {
      logger.debug('Error in Keyspace Creation, trying again...');
      process.exit(1);
    } else {
      logger.debug('Keyspace Created, Moving ahead...');
      done();
    }
  });
}

function tableCreation(done) {
  /**
   * creating tables
   */
  async.each(queries, dboperations, (err) => { // eslint-disable-line consistent-return
    if (err) { logger.debug('Error in DB Creation, try again...', err); process.exit(1); }
    logger.debug('Database Created');
  });
  done();
}

function dbCreate() {
  async.series([keyspaceCreation, tableCreation], (err) => {
    if (err) { logger.debug('Error in Db Creation, try again...', err); process.exit(1); }
  });
}

dbCreate();

module.exports = {
  dbCreate,
};
