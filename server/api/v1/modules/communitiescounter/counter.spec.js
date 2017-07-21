require('chai').should();
require('../../../../app');
const counterctrl = require('./counter.service');
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
  console.log("hi i am in Testcases")
  before(() => {
    client.execute(`UPDATE ${COMMUNITIES_COUNTER_TABLE} SET members = members + 1,requests = requests + 1,invitations = invitations + 1,tools = tools + 1 WHERE domain='${domain}'`)
      .then(() => {})
      .catch(() => {});
  });

  it('Testing counterctrl::getcounter for sucess scenario', (done) => {
    const query = `SELECT * FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        done(err);
      }
      counterservice.getcounter(domain, (err2, result2) => {
        if (err2) {
          logger.debug(err2);
          done(err2);
        }
        result2[0].should.deep.equal(result.rows[0]);
      });
    });
    done();
  });
  it('Testing counterctrl::incrementmember for sucess scenario', (done) => {
    const query = `SELECT members FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
    client.execute(query, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        logger.debug(err);
        return done(err);
      }
      counterctrl.newmemberadded(domain,
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
  // it('Testing  counterctrl::incrementinvitation for sucess scenario', (done) => {
  //   const query = `SELECT invitations FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
  //   client.execute(query, (err, result) => { // eslint-disable-line consistent-return
  //     if (err) {
  //       logger.debug(err);
  //       done(err);
  //     }
  //     counterservice.incrementinvitation(domain,
  //       (err2) => { // eslint-disable-line consistent-return
  //         if (err2) {
  //           logger.debug(err2);
  //           done(err2);
  //         }
  //         client.execute(query, (errquery, resultupdated) => {
  //           if (errquery) {
  //             logger.debug(errquery);
  //             done(errquery);
  //           }
  //           parseInt(resultupdated.rows[0].invitations) // eslint-disable-line radix
  //             .should.deep.equal(parseInt(result.rows[0] // eslint-disable-line radix
  //               .invitations) + 1); // eslint-disable-line radix
  //         });
  //       });
  //     done();
  //   });
  // });
  // it('Testing  counterctrl::incrementtools for sucess scenario', (done) => {
  //   const query = `SELECT tools FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
  //   client.execute(query, (err, result) => { // eslint-disable-line consistent-return
  //     if (err) {
  //       logger.debug(err);
  //       done(err);
  //     }
  //     counterservice.incrementtools(domain,
  //       (err2) => { // eslint-disable-line consistent-return
  //         if (err2) {
  //           logger.debug(err2);
  //           done(err2);
  //         }
  //         client.execute(query, (errquery, resultupdated) => {
  //           if (errquery) {
  //             logger.debug(errquery);
  //             done(errquery);
  //           }
  //           parseInt(resultupdated.rows[0].tools) // eslint-disable-line radix
  //             .should.deep.equal(parseInt(result.rows[0].tools) + 1); // eslint-disable-line radix
  //         });
  //       });
  //     done();
  //   });
  // });
  // it('Testing  counterctrl::incrementrequests for sucess scenario', (done) => {
  //   const query = `SELECT requests FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
  //   client.execute(query, (err, result) => { // eslint-disable-line consistent-return
  //     if (err) {
  //       logger.debug(err);
  //       done(err);
  //     }
  //     counterservice.incrementrequests(domain, (err2) => {
  //       if (err2) { // eslint-disable-line consistent-return
  //         logger.debug(err2);
  //         done(err2);
  //       }
  //       client.execute(query, (errquery, resultupdated) => {
  //         if (errquery) {
  //           logger.debug(errquery);
  //           done(errquery);
  //         }
  //         parseInt(resultupdated.rows[0].requests) // eslint-disable-line radix
  //           .should.deep.equal(parseInt(result.rows[0].requests) + 1); // eslint-disable-line radix
  //       });
  //     });
  //     done();
  //   });
  // });
  // it('Testing communityservice::decrementmember for sucess scenario', (done) => {
  //   const query = `SELECT members FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
  //   client.execute(query, (err, result) => { // eslint-disable-line consistent-return
  //     if (err) {
  //       logger.debug(err);
  //       return done(err);
  //     }
  //     counterservice.decrementmember(domain,
  //       (err2) => { // eslint-disable-line consistent-return
  //         if (err2) {
  //           logger.debug(err2);
  //           done(err2);
  //         }
  //         client.execute(query, (errquery, resultupdated) => {
  //           logger.debug(resultupdated);
  //           if (errquery) {
  //             logger.debug(errquery);
  //             done(errquery);
  //           }
  //           parseInt(resultupdated.rows[0].members) // eslint-disable-line radix
  //             .should.deep.equal(parseInt(result.rows[0].members) - 1); // eslint-disable-line radix
  //         });
  //       });
  //     done();
  //   });
  // });
  // it('Testing communityservice::decrementrequests for sucess scenario', (done) => {
  //   const query = `SELECT requests FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
  //   client.execute(query, (err, result) => { // eslint-disable-line consistent-return
  //     if (err) {
  //       logger.debug(err);
  //       done(err);
  //     }
  //     counterservice.decrementrequests(domain,
  //       (err2) => { // eslint-disable-line consistent-return
  //         if (err2) {
  //           logger.debug(err2);
  //           done(err2);
  //         }
  //         client.execute(query, (errquery, resultupdated) => {
  //           logger.debug(resultupdated);
  //           if (errquery) {
  //             logger.debug(errquery);
  //             done(errquery);
  //           }
  //           parseInt(resultupdated.rows[0].requests) // eslint-disable-line radix
  //             .should.deep.equal(parseInt(result.rows[0]// eslint-disable-line radix
  //               .requests) - 1); // eslint-disable-line radix
  //         });
  //       });
  //     done();
  //   });
  // });
  // it('Testing communityservice::decrementtools for sucess scenario', (done) => {
  //   const query = `SELECT tools FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
  //   client.execute(query, (err, result) => { // eslint-disable-line consistent-return
  //     if (err) {
  //       logger.debug(err);
  //       done(err);
  //     }
  //     counterservice.decrementtools(domain,
  //       (err2) => { // eslint-disable-line consistent-return
  //         if (err2) {
  //           logger.debug(err2);
  //           done(err2);
  //         }
  //         client.execute(query, (errquery, resultupdated) => {
  //           logger.debug(resultupdated);
  //           if (errquery) {
  //             logger.debug(errquery);
  //             done(errquery);
  //           }
  //           parseInt(resultupdated.rows[0].tools) // eslint-disable-line radix
  //             .should.deep.equal(parseInt(result.rows[0].tools) - 1); // eslint-disable-line radix
  //         });
  //       });
  //     done();
  //   });
  // });
  // it('Testing communityservice::decrementinvitation for sucess scenario', (done) => {
  //   const query = `SELECT invitations FROM ${COMMUNITIES_COUNTER_TABLE} where domain = '${domain}'`;
  //   client.execute(query, (err, result) => { // eslint-disable-line consistent-return
  //     if (err) {
  //       logger.debug(err);
  //       done(err);
  //     }
  //     counterservice.decrementinvitation(domain,
  //       (err2) => { // eslint-disable-line consistent-return
  //         if (err2) {
  //           logger.debug(err2);
  //           done(err2);
  //         }
  //         client.execute(query, (errquery, resultupdated) => {
  //           logger.debug(resultupdated);
  //           if (errquery) {
  //             logger.debug(errquery);
  //             done(errquery);
  //           }
  //           parseInt(resultupdated.rows[0].invitations) // eslint-disable-line radix
  //             .should.deep.equal(parseInt(result.rows[0] // eslint-disable-line radix
  //               .invitations) - 1); // eslint-disable-line radix
  //         });
  //       });
  //     done();
  //   });
  // });
  // after(() => {
  //   client.execute('truncate communitiescounter')
  //     .then(() => {})
  //     .catch(() => {});
  // });
});
