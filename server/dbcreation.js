const model = require('cassandra-driver');

const logger = require('log4js').getLogger();

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
const TABLE_TOOLS = 'tools';
const TABLE_ROLES = 'communityroles';
const TABLE_REQUESTS = 'communityinviterequests';
const TABLE_COUNTER = 'communitiescounter';

const queries = [];

/**
* Describing keyspace details
*/
queries.push(`CREATE KEYSPACE IF NOT EXISTS ${KEYSPACE} WITH replication = \
  {'class': 'SimpleStrategy', 'replication_factor': '1'} \
 `);

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
  roles set<text>, \
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
  actions set<text>, \
  activityevents set<text>, \
  createdon timestamp, \
  updatedon timestamp, \
  PRIMARY KEY (domain, toolid)
)`);

/**
* Describing Table for Tools data according to tool's perspective
*/

queries.push(`CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_TOOLS} ( \
  domains set<text>, \
  toolid text, \
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


/**
* KEYSPACE & TABLE Creation
*/
client.connect()
.then(() => client.execute(queries[0]))
.then(() => {
  logger.debug('keyspace created');
  return client.execute(queries[1]);
})
.then(() => {
  logger.debug(`table ${TABLE_COMMUNITIES} created`);
  return client.execute(queries[2]);
})
.then(() => {
  logger.debug(`table ${TABLE_COMMUNITY_MEMBERSHIP} created`);
  return client.execute(queries[3]);
})
.then(() => {
  logger.debug(`table ${TABLE_MEMBERSHIP} created`);
  return client.execute(queries[4]);
})
.then(() => {
  logger.debug(`table ${TABLE_COMMUNITY_TOOLS} created`);
  return client.execute(queries[5]);
})
.then(() => {
  logger.debug(`table ${TABLE_TOOLS} created`);
  return client.execute(queries[6]);
})
.then(() => {
  logger.debug(`table ${TABLE_ROLES} created`);
  return client.execute(queries[7]);
})
.then(() => {
  logger.debug(`table ${TABLE_REQUESTS} created`);
  return client.execute(queries[8]);
})
.then(() => {
  logger.debug(`table ${TABLE_COUNTER} created`);
  client.shutdown();
  return logger.debug('all required tables created');
})
.catch((err) => {
  client.shutdown();
  logger.debug('error in Database operations:', err);
  process.exit();
});
