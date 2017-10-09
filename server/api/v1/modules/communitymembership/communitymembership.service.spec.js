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


/*
 * Negative test case check for all methods when data existence check
 *
 * Checking for POST,GET,UPDATE,DELETE
 *
 */
describe('Negative test case check for communitymembership when data existence check', () => {
  /*
   *Run before all test cases in this block
   *
   * before hook to execute arbitrary code before this block
   */
  before(() => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni';`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.chnni'`);
    client.execute('TRUNCATE calvincommunity.membership');
  });


  /*
   *GET Method- Testing get method for error when no data available for a domain
   */
  it('should get error as domain is not available in database', (done) => {
    request(app)
      .get(`${uri}wipro.chnni/members`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .end((err, res) => {
        if (!err) {
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.nodomainExist);
            done();
          });
        }
      });
    return null;
  });

  /* POST Method -
   * Testing post method to add community roles to check availability of role for a domain
   *
   */
  it('should post communityroles to database', (done) => {
    request(app)
      .post('/api/v1/communityrole/wipro.chnni')
      .send(value.addCommunityRoles)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.deep.equal(value.successAddCommunityRoles);
        return done();
      });
    return null;
  });
  /*
   *Testing post method to add member details
   *
   * POST request
   */
  it('Add new members to a community', (done) => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni';`);
    let iterateTestData = 0;
    request(app)
      .post(`${uri}wipro.chnni/members`)
      .send(value.addMembers)
      .expect(200)
      .end((err, results) => {
        if (!err) {
          results.body.should.deep.equal(value.successAddedMember);
          client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error1, res) => {
            if (!error1) {
              res.rows.length.should.be.equal(value.addMembers.length);
              value.addMembers.forEach((data) => {
                client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni' and username='${data.username}'`, (error, result) => {
                  if (!error) {
                    // logger.debug(result.rows[0].domain);
                    // logger.debug(result.rows[0].username);
                    // logger.debug(result.rows[0].role);
                    // logger.debug(data.username);
                    // logger.debug(data.role);
                    result.rows[0].domain.should.deep.equal('wipro.chnni');
                    result.rows[0].username.should.deep.equal(data.username);
                    result.rows[0].role.should.deep.equal(data.role);
                    iterateTestData += 1;
                    if (iterateTestData === res.rows.length) {
                      iterateTestData.should.deep.equal(value.addMembers.length);

                      done();
                    }
                  }
                });
              });
            }
          });
        }
      });
  });


  /*
   *Testing post method to check error when data already exist in database
   *
   * POST request
   *
   */

  it('should not post if member already exists', (done) => {
    request(app)
      .post(`${uri}wipro.chnni/members`)
      .send(value.addMembers)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error, result) => {
            result.rows.length.should.deep.equal(value.addMembers.length);
            res.body.should.deep.equal(value.errorAddingMember);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing delete method to check error when given data is not exist
   *
   * DELETE request
   *
   */

  it('should give error on delete data in database when data not exist in database', (done) => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni';`);
    request(app)
      .delete(`${uri}wipro.chnni/members`)
      .send(value.addMembers)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          // logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.noDataExist);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing delete method to check error when given data is not exist
   *
   * DELETE request
   *
   */

  it('should give error on patch data in database when data not exist in database', (done) => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni';`);
    request(app)
      .patch(`${uri}wipro.chnni/members`)
      .send(value.addMembers)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          // logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.noDataExist);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Run after all test cases in this block
   *
   * after hook to execute arbitrary code after this block
   */


  after('', () => {
    client.execute('TRUNCATE calvincommunity.membership');
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni'`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.chnni'`);
  });
});


/*
 *Negative test case check for all methods when URI parameter is not given properly
 *
 * Checking for POST,GET,UPDATE,DELETE
 */
describe('Negative test case check for communitymembership when URI parameter is not given properly', () => {
  /*
   *Run before all test cases in this block
   *
   * before hook to execute arbitrary code before this block
   */
  before(() => {
    client.execute('TRUNCATE calvincommunity.membership');
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr';`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });

  /*
   *Testing post method to check error when URI parameter is not given properly
   *
   * POST request
   */

  it('should through error resource not found while posting data', (done) => {
    request(app)
      .post(`${uri}/members`)
      .send(value.addMembers)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.deep.equal(value.resourceError);
        return done();
      });
    return null;
  });

  /*
   *Testing delete method to check error when URI parameter is not given properly
   *
   * DELETE request
   *
   */

  it('should through error resource not found while deleting data', (done) => {
    request(app)
      .delete(`${uri}/members`)
      .send(value.addMembers)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.deep.equal(value.resourceError);
        return done();
      });
    return null;
  });

  /*
   *Testing get method for error when domain of URI is not given properly
   * GET request
   */
  it('should through error resource not found while getting data', (done) => {
    request(app)
      .get(`${uri}/members`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        res.body.should.deep.equal(value.resourceError);
        done();
      });
  });

  /*
   *Testing patch method to check error when URI parameter is not given properly
   *
   * PATCH request
   */

  it('should through error resource not found while Updating data', (done) => {
    request(app)
      .patch(`${uri}/members`)
      .send(value.updateMembers)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.deep.equal(value.resourceError);
        return done();
      });
    return null;
  });

  /*
   *Run after all test cases in this block
   *
   * after hook to execute arbitrary code after this block
   */


  after('', () => {
    client.execute('TRUNCATE calvincommunity.membership');
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr'`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });
});


/*
 *Negative test case check for all methods when specified role is not available for a community
 *
 * Checking for POST,UPDATE
 */
describe('Negative test case check for communitymembership when specified role is not available for a community', () => {
  /*
   *Run before all test cases in this block
   *
   * before hook to execute arbitrary code before this block
   */
  before(() => {
    client.execute('TRUNCATE calvincommunity.membership');
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr';`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });

  /*
   *Testing post method to check error when given role not available for a domain
   *
   * POST request
   */

  it('should give error on post data in database when role is not exist for a domain', (done) => {
    request(app)
      .post(`${uri}wipro.blr/members`)
      .send(value.noRoleExist)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.noRoleInDomain);
            done();
          });
        }
      });
    return null;
  });
  /*
   *Testing patch method to check error when given role not available for a domain
   *
   * PATCH request
   */

  it('should give error on patch data in database when role is not exist for a domain', (done) => {
    request(app)
      .patch(`${uri}wipro.blr/members`)
      .send(value.noRoleExist)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.noRoleInDomain);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Run after all test cases in this block
   *
   * after hook to execute arbitrary code after this block
   */


  after('', () => {
    client.execute('TRUNCATE calvincommunity.membership');
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr'`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });
});

/*
 *Negative test case check for all methods when any value username and role is empty or not declared
 *
 * Checking for POST,UPDATE,DELETE
 */
describe('Negative test case check for all methods for communitymembership when any value username and role is empty or not declared ', () => {
  /*
   *Run before all test cases in this block
   *
   * before hook to execute arbitrary code before this block
   */
  before(() => {
    client.execute('TRUNCATE calvincommunity.membership');
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr';`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });

  /*
   *Testing post method to check error when data is empty
   *
   * POST request
   */
  it('Testing post method to check error when data is empty', (done) => {
    request(app)
      .post(`${uri}wipro.blr/members`)
      .send(value.emptyData)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing post method to check error when username is empty
   *
   * POST request
   */
  it('Testing post method to check error when username is empty', (done) => {
    request(app)
      .post(`${uri}wipro.blr/members`)
      .send(value.emptyUsername)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing post method to check error when username is not declared
   *
   * POST request
   */
  it('should give error on post data in database when username is not declared', (done) => {
    request(app)
      .post(`${uri}wipro.blr/members`)
      .send(value.noUsername)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing patch method to check error when data is empty
   *
   * PATCH request
   */
  it('Testing patch method to check error when data is empty', (done) => {
    request(app)
      .patch(`${uri}wipro.blr/members`)
      .send(value.emptyData)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });
  /*
   *Testing patch method to check error when username is empty
   *
   * PATCH request
   */
  it('Testing patch method to check error when username is empty', (done) => {
    request(app)
      .patch(`${uri}wipro.blr/members`)
      .send(value.emptyUsername)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing patch method to check error when username is not declared
   *
   * PATCH request
   */
  it('should give error on patch data in database when username is not declared', (done) => {
    request(app)
      .patch(`${uri}wipro.blr/members`)
      .send(value.noUsername)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing delete method to check error when username is empty
   *
   * DELETE request
   */
  it('Testing delete method to check error when username is empty', (done) => {
    request(app)
      .delete(`${uri}wipro.blr/members`)
      .send(value.emptyUsername)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyUserValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing delete method to check error when username is not declared
   *
   * DELETE request
   */
  it('should give error on delete data in database when username is not declared', (done) => {
    request(app)
      .delete(`${uri}wipro.blr/members`)
      .send(value.noUsername)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyUserValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing post method to check error when role is empty
   *
   * POST request
   */
  it('Testing post method to check error when role is empty', (done) => {
    request(app)
      .post(`${uri}wipro.blr/members`)
      .send(value.emptyRole)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing post method to check error when role is not declared
   *
   * POST request
   */
  it('should give error on post data in database when role is not declared', (done) => {
    request(app)
      .post(`${uri}wipro.blr/members`)
      .send(value.noRole)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing patch method to check error when role is empty
   *
   * PATCH request
   */
  it('Testing patch method to check error when role is empty', (done) => {
    request(app)
      .patch(`${uri}wipro.blr/members`)
      .send(value.emptyRole)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing patch method to check error when role is not declared
   *
   * PATCH request
   */
  it('should give error on patch data in database when role is not declared', (done) => {
    request(app)
      .patch(`${uri}wipro.blr/members`)
      .send(value.noRole)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyDataValueError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Run after all test cases in this block
   *
   * after hook to execute arbitrary code after this block
   */

  after('', () => {
    client.execute('TRUNCATE calvincommunity.membership');
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr'`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });
});

/*
 *Negative test case check for all methods when no data is given in a body
 *
 * Checking for POST,UPDATE,DELETE
 */
describe('Negative test case check for all methods for communitymembership when no data is given in a body', () => {
  /*
   *Run before all test cases in this block
   *
   * before hook to execute arbitrary code before this block
   */
  before(() => {
    client.execute('TRUNCATE calvincommunity.membership');
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr';`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });

  /*
   *Testing post method to check error when no data is given
   *
   * POST request
   */
  it('should give error on post data in database when no values are given', (done) => {
    request(app)
      .post(`${uri}wipro.blr/members`)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyBodyError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing post method to check error when empty body data is given
   *
   * POST request
   */

  it('should give error on post data in database when body is empty', (done) => {
    request(app)
      .post(`${uri}wipro.blr/members`)
      .send(value.emptyBody)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyBodyError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing patch method to check error when no data is given
   *
   * PATCH request
   */
  it('should give error on patch data in database when no values are given', (done) => {
    request(app)
      .patch(`${uri}wipro.blr/members`)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyBodyError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing patch method to check error when empty body data is given
   *
   * PATCH request
   */

  it('should give error on patch data in database when body is empty', (done) => {
    request(app)
      .patch(`${uri}wipro.blr/members`)
      .send(value.emptyBody)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyBodyError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing delete method to check error when no data is given
   *
   * DELETE request
   */
  it('should give error on delete data in database when no values are given', (done) => {
    request(app)
      .delete(`${uri}wipro.blr/members`)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyBodyError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Testing delete method to check error when empty body data is given
   *
   * DELETE request
   */

  it('should give error on delete data in database when body is empty', (done) => {
    request(app)
      .delete(`${uri}wipro.blr/members`)
      .send(value.emptyBody)
      .expect(400)
      .end((err, res) => {
        if (!err) {
          logger.debug(res.body);
          client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.blr'`, (error, result) => {
            result.rows.length.should.deep.equal(0);
            res.body.should.deep.equal(value.emptyBodyError);
            done();
          });
        }
      });
    return null;
  });

  /*
   *Run after all test cases in this block
   *
   * after hook to execute arbitrary code after this block
   */

  after('', () => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr'`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });
});


/*
 *Positive test case check for all methods
 *
 * Checking for POST,GET,UPDATE,DELETE
 */

describe('Positive test case check for all methods for communitymembership', () => {
  /*
   *Run before all test cases in this block
   *
   * before hook to execute arbitrary code before this block
   */
  before(() => {
    client.execute('TRUNCATE calvincommunity.membership');
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni';`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.chnni'`);
  });

  /* Testing post method to add community roles to check availability of role for a domain
   *
   * POST request
   */
  it('should post communityroles to database', (done) => {
    request(app)
      .post('/api/v1/communityrole/wipro.chnni')
      .send(value.addCommunityRoles)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.deep.equal(value.successAddCommunityRoles);
        return done();
      });
    return null;
  });
  /*
   *Testing post method to add member details
   *
   * POST request
   */
  it('Add new members to a community', (done) => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni';`);
    let iterateTestData = 0;
    request(app)
      .post(`${uri}wipro.chnni/members`)
      .send(value.addMembers)
      .expect(200)
      .end((err, results) => {
        if (!err) {
          results.body.should.deep.equal(value.successAddedMember);
          client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error1, res) => {
            if (!error1) {
              res.rows.length.should.be.equal(value.addMembers.length);
              value.addMembers.forEach((data) => {
                client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni' and username='${data.username}'`, (error, result) => {
                  if (!error) {
                    result.rows[0].domain.should.deep.equal('wipro.chnni');
                    result.rows[0].username.should.deep.equal(data.username);
                    result.rows[0].role.should.deep.equal(data.role);
                    iterateTestData += 1;
                    if (iterateTestData === res.rows.length) {
                      iterateTestData.should.deep.equal(value.addMembers.length);

                      done();
                    }
                  }
                });
              });
            }
          });
        }
      });
  });

  /*
   *Testing get method to get details of a particular domain
   *
   * GET request
   */

  it('Get a members in a community', (done) => {
    // client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni';`);
    let iterateTestData = 0;
    request(app)
      .get(`${uri}wipro.chnni/members`)
      .expect(200)
      .end((err, results) => {
        logger.debug(results.body.MemberDetails.length);
        if (!err) {
          client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error1, res) => {
            if (!error1) {
              res.rows.length.should.be.equal(results.body.MemberDetails.length);
              results.body.MemberDetails.forEach((data) => {
                client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni' and username='${data.username}'`, (error, result) => {
                  if (!error) {
                    result.rows[0].domain.should.deep.equal(results.body.domain);
                    result.rows[0].username.should.deep.equal(data.username);
                    result.rows[0].role.should.deep.equal(data.role);
                    iterateTestData += 1;
                    if (iterateTestData === res.rows.length) {
                      iterateTestData.should.deep.equal(results.body.MemberDetails.length);

                      done();
                    }
                  }
                });
              });
            }
          });
        }
      });
  });

  /**
   *Testing patch method to update role of a members
   *
   * PATCH request
   */
  it('update a role of a members in a community', (done) => {
    let iterateTestData = 0;
    request(app)
      .patch(`${uri}wipro.chnni/members`)
      .send(value.updateMembers)
      .expect(200)
      .end((err, results) => {
        if (!err) {
          results.body.should.deep.equal(value.successUpdatedMembers);
          client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error1, res) => {
            if (!error1) {
              res.rows.length.should.be.equal(value.updateMembers.length);
              value.updateMembers.forEach((data) => {
                client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni' and username='${data.username}'`, (error, result) => {
                  if (!error) {
                    result.rows[0].domain.should.deep.equal('wipro.chnni');
                    result.rows[0].username.should.deep.equal(data.username);
                    result.rows[0].role.should.deep.equal(data.role);
                    iterateTestData += 1;
                    if (iterateTestData === res.rows.length) {
                      iterateTestData.should.deep.equal(value.addMembers.length);

                      done();
                    }
                  }
                });
              });
            }
          });
        }
      });
  });

  /*
   *Testing get method to get details of a particular domain
   *
   * GET request
   */


  it('Get a members in a community', (done) => {
    let iterateTestData = 0;
    request(app)
      .get(`${uri}wipro.chnni/members`)
      .expect(200)
      .end((err, results) => {
        logger.debug(results.body.MemberDetails.length);
        if (!err) {
          client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error1, res) => {
            if (!error1) {
              res.rows.length.should.be.equal(results.body.MemberDetails.length);
              results.body.MemberDetails.forEach((data) => {
                client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni' and username='${data.username}'`, (error, result) => {
                  if (!error) {
                    result.rows[0].domain.should.deep.equal(results.body.domain);
                    result.rows[0].username.should.deep.equal(data.username);
                    result.rows[0].role.should.deep.equal(data.role);
                    iterateTestData += 1;
                    if (iterateTestData === res.rows.length) {
                      iterateTestData.should.deep.equal(results.body.MemberDetails.length);
                      done();
                    }
                  }
                });
              });
            }
          });
        }
      });
  });

  /*
   *Testing delete method to delete member details
   *
   * DELETE request
   */
  it('Delete a members from a community', (done) => {
    let iterate = value.updateMembers.length;
    request(app)
      .delete(`${uri}wipro.chnni/members`)
      .send(value.updateMembers)
      .expect(200)
      .end((err, results) => {
        if (!err) {
          results.body.should.deep.equal(value.successDeletedMember);
          client.execute(`SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni'`, (error1, res) => {
            if (!error1) {
              res.rows.length.should.be.equal(0);
              value.updateMembers.forEach((data) => {
                client.execute(`SELECT domain,username FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain='wipro.chnni' and username='${data.username}'`, (error, result) => {
                  if (!error) {
                    result.rows[0].domain.should.deep.equal('wipro.chnni');
                    result.rows[0].username.should.deep.equal(data.username);
                  }
                }); iterate -= 1;
              });

              iterate.should.deep.equal(res.rows.length);

              done();
            }
          });
        }
      });
  });

  /*
 *Run after all test cases in this block
 *
 * after hook to execute arbitrary code after this block
 */

  after('', () => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni'`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.chnni'`);
    client.execute('TRUNCATE calvincommunity.communitymembership');
    client.execute('TRUNCATE calvincommunity.membership');
  });
});
