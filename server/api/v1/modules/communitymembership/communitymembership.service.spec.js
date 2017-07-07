 require('chai').should();

 const app = require('../../../../app');

 const request = require('supertest');

 const model = require('cassandra-driver');

 const logger = require('../../../../logger');

 const connectionString = require('../../../../config').connectionString;

 const client = new model.Client({
   contactPoints: [connectionString.contact],
   protocolOptions: { port: connectionString.port },
   keyspace: connectionString.keyspace,
 });

 const COMMUNITY_MEMBERSHIP_TABLE = 'communitymembership';
 const COMMUNITY_ROLES_TABLE = 'communityroles';
 const value = require('./communitymembership.testData');

 const uri = '/api/v1/communitymembership/';


 describe('Create a community and update it', () => {
  /**
 *Run before all test cases in this block
 *
 * before hook to execute arbitrary code before this block
 *
 *
 */
   before(() => {
     client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni';`);
     client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.chnni'`);
   });

   // it('Add new member to a community', (done) => {
   //   request(app)
   //          .post(`${uri}wipro.chnni/members`)
   //          .send(addMember)
   //          .then(() => {
   // client.execute(`SELECT username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE}
   // where domain='wipro.chnni'`, (err, result) => {
   //              if (!err) {
   //          // logger.debug(`Result from testcase ${result.rows[0]}`);
   //                result.rows.length.should.be.equal(2);
   //                logger.debug(result);
   //                logger.debug(result.rows[0])
   //                logger.debug(addMember[0]);
   //                result.rows.should.deep.equal(addMember[0]);
   //                done();
   //              }
   //            });
   //          })
   //    .catch((err) => {
   //      logger.debug('In error');
   //      done(err);
   //    });
   // });

/**
 *Testing post method to add member details
 *
 * POST request
 *
 *
 */
   it('Add new member to a community', (done) => {
     request(app)
            .post(`${uri}wipro.chnni/members`)
            .send([{
              username: 'Aravindh',
              role: 'trainee-fullStack-developer',
            }])
            .then(() => {
              client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni'`, (err, result) => {
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('wipro.chnni');
                result.rows[0].username.should.be.equal('Aravindh');
                result.rows[0].role.should.be.equal('trainee-fullStack-developer');
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
   });

   /**
 *Testing patch method to check error when given role not available for a domain
 *
 * PATCH request
 *
 *
 */

   it('Error updating a community member', (done) => {
     request(app)
            .patch(`${uri}wipro.chnni/members`)
            .send([{
              username: 'Aravindh',
              role: 'trainee-fullStack',
            }])
            .then(() => {
              client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni' AND username='Aravindh'`, (err, result) => {
                if (!err) {
                  result.rows.length.should.be.equal(0);
                  result.rows[0].domain.should.be.equal('wipro.chnni');
                  result.rows[0].username.should.be.equal('Aravindh');
                  result.rows[0].role.should.be.equal('trainee-fullStack');
                }
                if (err) {
                  logger.debug('No data available');
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
   });

/**
 *Testing post method to add community roles to check availability of role for a domain
 *
 * POST request
 *
 *
 */
   it('should post communityroles to database', (done) => {
     request(app)
            .post('/api/v1/communityrole/wipro.chnni')
            .send(value.addCommunityRolesForSerive)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.successAddCommunityRoles);
              return done();
            });
     return null;
   });

/**
 *Testing get method to get details of a particular domain
 *
 * GET request
 *
 *
 */
   it('Get a member of community with role', (done) => {
     request(app)
            .get(`${uri}wipro.chnni/members`)
            .then(() => {
              client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE}  where domain='wipro.chnni' `, (err, result) => {
                if (!err) {
                  result.rows.length.should.be.equal(1);
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
   });

          /**
 *Testing patch method to update role for a members in a domain when role exist for a domain
 * PATCH request
 *
 *
 */

   it('Update a community member', (done) => {
     request(app)
            .patch(`${uri}wipro.chnni/members`)
            .send([{
              username: 'Aravindh',
              role: 'trainee-fullStack',
            }])
            .then(() => {
              client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni' AND username='Aravindh'`, (err, result) => {
                if (!err) {
                  result.rows.length.should.be.equal(0);
                  result.rows[0].domain.should.be.equal('wipro.chnni');
                  result.rows[0].username.should.be.equal('Aravindh');
                  result.rows[0].role.should.be.equal('trainee-fullStack');
                }
                if (err) {
                  logger.debug('No data available');
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
   });

   /**
 *Testing get method to get details of a particular domain
 *
 * GET request
 *
 *
 */

   it('Get a member of community with role', (done) => {
     request(app)
            .get(`${uri}wipro.chnni/members`)
            .then(() => {
              client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE}  where domain='wipro.chnni' `, (err, result) => {
                if (!err) {
                  result.rows.length.should.be.equal(1);
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
   });
   /**
 *Testing delete method to delete member details
 *
 * DELETE request
 *
 *
 */
   it('Delete a community member', (done) => {
     request(app)
            .delete(`${uri}wipro.chnni/members`)
                        .send([{
                          username: 'Aravindh',
                          role: 'trainee-fullStack',
                        }])
            .then(() => {
              client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive' AND username='Aravindh' `, (err) => {
                if (!err) {
                  logger.debug('Data deleted');
                }
                if (err) {
                  logger.debug('No data available');
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
   });

  /**
 *Testing get method for error when domain not available in database
 *
 * GET request
 *
 *
 */
   it('Error on Get a member of community with role', (done) => {
     request(app)
            .get(`${uri}wipro.chnni/members`)
            .then(() => {
              client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE}  where domain='wipro.chnni' `, (err, result) => {
                if (!err) {
                  result.rows.length.should.be.equal(1);
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
   });
   /**
 *Testing delete method to check error when given data is not exist
 *
 * DELETE request
 *
 *
 */

   it('Error Delete a community member', (done) => {
     request(app)
            .delete(`${uri}wipro.chnni/members`)
                        .send([{
                          username: 'Aravindh',
                          role: 'trainee-fullStack',
                        }])
            .then(() => {
              client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive' AND username='Aravindh' `, (err) => {
                if (!err) {
                  logger.debug('Data deleted');
                }
                if (err) {
                  logger.debug('No data available');
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
   });

  /**
 *Run after all test cases in this block
 *
 * after hook to execute arbitrary code after this block
 *
 *
 */
   after('', () => {
     client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni'`);
     client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.chnni'`);
   });
 });
