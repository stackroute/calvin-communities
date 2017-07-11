require('chai').should();
require('../../../../app');
const counterctrl = require('./counter.controller');
const model = require('cassandra-driver');

const COMMUNITIES_COUNTER_TABLE = 'communitiescounter';
const connectionString = require('../../../../config').connectionString;
const logger = require('../../../../logger');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});
const domain = 'roshini1';


describe('Testcases for checking the communitycounter', () => {
  before(() => {
    client.execute(`UPDATE ${COMMUNITIES_COUNTER_TABLE} SET members = members + 1,requests = requests + 1,invitations = invitations + 1,tools = tools + 1 WHERE domain='${domain}'`)
      .then(() => {})
      .catch(() => {});
  });

  it('Testing communityController::getcounter for sucess scenario', (done) => {
    const query = `SELECT * FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        done(err);
      }
      counterctrl.getcounter(domain, (err2, result2) => {
        if (err2) {
          logger.debug(err2);
          done(err2);
        }
        result2[0].should.deep.equal(result.rows[0]);
      });
    });
    done();
  });
  it('Testing communityController::incrementmember for sucess scenario', (done) => {
    const query = `SELECT members FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        return done(err);
      }
      counterctrl.incrementmember(domain,
        (err2) => { // eslint-disable-line consistent-return
          if (err2) {
            logger.debug(err2);
            done(err2);
          }
          client.execute(query, (errquery, resultupdated) => {
            if (errquery) {
              logger.debug(errquery);
              done(errquery);
            }
            parseInt(resultupdated.rows[0].members) // eslint-disable-line radix
              .should.deep.equal(parseInt(result.rows[0].members) + 1); // eslint-disable-line radix
          });
        });
      done();
    });
  });
  it('Testing communityController::incrementinvitation for sucess scenario', (done) => {
    const query = `SELECT invitations FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        done(err);
      }
      counterctrl.incrementinvitation(domain,
        (err2) => { // eslint-disable-line consistent-return
          if (err2) {
            logger.debug(err2);
            done(err2);
          }
          client.execute(query, (errquery, resultupdated) => {
            if (errquery) {
              logger.debug(errquery);
              done(errquery);
            }
            parseInt(resultupdated.rows[0].invitations) // eslint-disable-line radix
              .should.deep.equal(parseInt(result.rows[0] // eslint-disable-line radix
                .invitations) + 1); // eslint-disable-line radix
          });
        });
      done();
    });
  });
  it('Testing communityController::incrementtools for sucess scenario', (done) => {
    const query = `SELECT tools FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        done(err);
      }
      counterctrl.incrementtools(domain,
        (err2) => { // eslint-disable-line consistent-return
          if (err2) {
            logger.debug(err2);
            done(err2);
          }
          client.execute(query, (errquery, resultupdated) => {
            if (errquery) {
              logger.debug(errquery);
              done(errquery);
            }
            parseInt(resultupdated.rows[0].tools) // eslint-disable-line radix
              .should.deep.equal(parseInt(result.rows[0].tools) + 1); // eslint-disable-line radix
          });
        });
      done();
    });
  });
  it('Testing communityController::incrementrequests for sucess scenario', (done) => {
    const query = `SELECT requests FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        done(err);
      }
      counterctrl.incrementrequests(domain, (err2) => {
        if (err2) { // eslint-disable-line consistent-return
          logger.debug(err2);
          done(err2);
        }
        client.execute(query, (errquery, resultupdated) => {
          if (errquery) {
            logger.debug(errquery);
            done(errquery);
          }
          parseInt(resultupdated.rows[0].requests) // eslint-disable-line radix
            .should.deep.equal(parseInt(result.rows[0].requests) + 1); // eslint-disable-line radix
        });
      });
      done();
    });
  });
  it('Testing communityController::decrementmember for sucess scenario', (done) => {
    const query = `SELECT members FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        return done(err);
      }
      counterctrl.decrementmember(domain,
        (err2) => { // eslint-disable-line consistent-return
          if (err2) {
            logger.debug(err2);
            done(err2);
          }
          client.execute(query, (errquery, resultupdated) => {
            logger.debug(resultupdated);
            if (errquery) {
              logger.debug(errquery);
              done(errquery);
            }
            parseInt(resultupdated.rows[0].members) // eslint-disable-line radix
              .should.deep.equal(parseInt(result.rows[0].members) - 1); // eslint-disable-line radix
          });
        });
      done();
    });
  });
  it('Testing communityController::decrementrequests for sucess scenario', (done) => {
    const query = `SELECT requests FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        done(err);
      }
      counterctrl.decrementrequests(domain,
        (err2) => { // eslint-disable-line consistent-return
          if (err2) {
            logger.debug(err2);
            done(err2);
          }
          client.execute(query, (errquery, resultupdated) => {
            logger.debug(resultupdated);
            if (errquery) {
              logger.debug(errquery);
              done(errquery);
            }
            parseInt(resultupdated.rows[0].requests) // eslint-disable-line radix
              .should.deep.equal(parseInt(result.rows[0]// eslint-disable-line radix
              .requests) - 1); // eslint-disable-line radix
          });
        });
      done();
    });
  });
  it('Testing communityController::decrementtools for sucess scenario', (done) => {
    const query = `SELECT tools FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        done(err);
      }
      counterctrl.decrementtools(domain,
        (err2) => { // eslint-disable-line consistent-return
          if (err2) {
            logger.debug(err2);
            done(err2);
          }
          client.execute(query, (errquery, resultupdated) => {
            logger.debug(resultupdated);
            if (errquery) {
              logger.debug(errquery);
              done(errquery);
            }
            parseInt(resultupdated.rows[0].tools) // eslint-disable-line radix
              .should.deep.equal(parseInt(result.rows[0].tools) - 1); // eslint-disable-line radix
          });
        });
      done();
    });
  });
  it('Testing communityController::decrementinvitation for sucess scenario', (done) => {
    const query = `SELECT invitations FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        done(err);
      }
      counterctrl.decrementinvitation(domain,
        (err2) => { // eslint-disable-line consistent-return
          if (err2) {
            logger.debug(err2);
            done(err2);
          }
          client.execute(query, (errquery, resultupdated) => {
            logger.debug(resultupdated);
            if (errquery) {
              logger.debug(errquery);
              done(errquery);
            }
            parseInt(resultupdated.rows[0].invitations) // eslint-disable-line radix
              .should.deep.equal(parseInt(result.rows[0] // eslint-disable-line radix
                .invitations) - 1); // eslint-disable-line radix
          });
        });
      done();
    });
  });
  after(() => {
    client.execute('truncate communitiescounter')
      .then(() => {})
      .catch(() => {});
  });
});
