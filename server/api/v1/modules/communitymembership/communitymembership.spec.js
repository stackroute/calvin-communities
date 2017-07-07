
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const expect = chai.expect;
const app = require('../../../../app');

const request = require('supertest');

// const communityMembershipService = require('./communitymembership.service');


const value = require('./communitymembership.testData');

const COMMUNITY_MEMBERSHIP_TABLE = 'communitymembership';

const COMMUNITY_ROLES_TABLE = 'communityroles';

const uri = '/api/v1/communitymembership/';

const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


describe('Test cases for membership of a community', () => {
/**
 *Run before all test cases in this block
 *
 * before hook to execute arbitrary code before this block
 *
 *
 */
  before(() => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr';`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });

/**
 *Testing post method to add member details
 *
 * POST request
 *
 *
 */
  it('should post data in database for all columns ', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .send(value.addMembers)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.successAddedMember);
              return done();
            });
    return null;
  });

/**
 *Testing post method to check error when no data is given
 *
 * POST request
 *
 *
 */
  it('should give error on post data in database when no values are given', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyBodyError);
              return done();
            });
    return null;
  });

  /**
 *Testing post method to check error when empty body data is given
 *
 * POST request
 *
 *
 */

  it('should give error on post data in database when body is empty', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .send(value.emptyBody)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyBodyError);
              return done();
            });
    return null;
  });


/**
 *Testing post method to check error when empty data for given body
 *
 * POST request
 *
 *
 */
  it('should give error on post data in database when data is empty', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .send(value.emptyData)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });

/**
 *Testing post method to check error when username is empty
 *
 * POST request
 *
 *
 */
  it('should give error on post data in database when username is empty', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .send(value.emptyUsername)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });

/**
 *Testing post method to check error when username is not declared
 *
 * POST request
 *
 *
 */
  it('should give error on post data in database when username is not declared', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .send(value.noUsername)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });

/**
 *Testing post method to check error when role is empty
 *
 * POST request
 *
 *
 */
  it('should give error on post data in database when role is empty', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .send(value.emptyRole)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });

  /**
 *Testing post method to check error when role is not declared
 *
 * POST request
 *
 *
 */

  it('should give error on post data in database when role is not declared', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .send(value.noRole)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });
 /**
 *Testing post method to check error when data already exist in database
 *
 * POST request
 *
 *
 */

  it('should not post if member already exists', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .send(value.addMembers)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.errorAddingMember);
              return done();
            });
    return null;
  });

   /**
 *Testing post method to check error when URI parameter is not given properly
 *
 * POST request
 *
 *
 */

  it('should through error resource not found while posting', (done) => {
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

/**
 *Testing delete method to delete member details
 *
 * DELETE request
 *
 *
 */
  it('should delete if member exists', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.addMembers)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.successDeletedMember);
              return done();
            });
    return null;
  });

  /**
 *Testing delete method to check error when no data is given
 *
 * DELETE request
 *
 *
 */

  it('should give error on delete data in database when no values are given', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyBodyError);
              return done();
            });
    return null;
  });

    /**
 *Testing delete method to check error when empty body data is given
 *
 * DELETE request
 *
 *
 */

  it('should give error on delete data in database when body is empty', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.emptyBody)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyBodyError);
              return done();
            });
    return null;
  });

/**
 *Testing delete method to check error when empty data for given body
 *
 * DELETE request
 *
 *
 */
  it('should give error on delete data in database when data is empty', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.emptyData)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });

/**
 *Testing delete method to check error when username is empty
 *
 * DELETE request
 *
 *
 */
  it('should give error on delete data in database when username is empty', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.emptyUsername)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });


/**
 *Testing delete method to check error when username is not declared
 *
 * DELETE request
 *
 *
 */
  it('should give error on  delete in database when username is not declared', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.noUsername)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });

  /**
 *Testing delete method to check error when role is empty
 *
 * DELETE request
 *
 *
 */

  it('should give error on delete data in database when role is empty', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.emptyRole)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });

  /**
 *Testing delete method to check error when role is not declared
 *
 * DELETE request
 *
 *
 */

  it('should give error on delete data in database when role is not declared', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.noRole)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });

   /**
 *Testing delete method to check error when given data is not exist
 *
 * DELETE request
 *
 *
 */

  it('should give error on delete data in database when data not exist in database', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.addMembers)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.noDataExist);
              return done();
            });
    return null;
  });

     /**
 *Testing delete method to check error when URI parameter is not given properly
 *
 * DELETE request
 *
 *
 */

  it('should through error resource not found while deleting', (done) => {
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
/**
 *Testing post method to add member details when domain is in uppercase
 *
 * POST request
 *
 *
 */
  it('should post data in database for all columns when domain in uppercase ', (done) => {
    request(app)
            .post(`${uri}wiPrO.Blr/members`)
            .send(value.addMembers)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.successAddedMember);
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
  it('should get data for specified domain', (done) => {
    request(app)
            .get(`${uri}wipro.blr/members`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('MemberDetails').a('Array');
              done();
            });
  });


  /**
 *Testing get method for error when domain not available in database
 *
 * GET request
 *
 *
 */


  it('should get error as domain is not available', (done) => {
    request(app)
            .get(`${uri}wiro.br/members`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.nodomainExist);
              done();
            });
  });

  /**
 *Testing get method for error when domain of URI is not given properly
 * GET request
 *
 *
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

   /**
 *Testing delete method to delete member details when domain is in uppercase
 *
 * delete request
 *
 *
 */
  it('should delete if member exists for domain even in uppercase', (done) => {
    request(app)
            .delete(`${uri}wiPro.Blr/members`)
            .send(value.addMembers)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.successDeletedMember);
              return done();
            });
    return null;
  });

  /**
 *Testing get method for error when no data available for a domain
 * GET request
 *
 *
 */
  it('should get error as domain is not available', (done) => {
    request(app)
            .get(`${uri}wiPro.bLr/members`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.nodomainExist);
              done();
            });
    return null;
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
            .post('/api/v1/communityrole/wipro.blr')
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

/**
 *Testing post method to add member details
 *
 * POST request
 *
 *
 */
  it('should post data in database for all columns ', (done) => {
    request(app)
            .post(`${uri}wipro.blr/members`)
            .send(value.addMembers)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.successAddedMember);
              return done();
            });
    return null;
  });

  /**
 *Testing patch method to check error when no data is given
 *
 * PATCH request
 *
 *
 */
  it('should give error on patch data in database when no values are given', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyBodyError);
              return done();
            });
    return null;
  });

  /**
 *Testing patch method to check error when empty body data is given
 *
 * PATCH request
 *
 *
 */

  it('should give error on patch data in database when body is empty', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.emptyBody)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyBodyError);
              return done();
            });
    return null;
  });

  /**
 *Testing patch method to check error when empty data for given body
 *
 * PATCH request
 *
 *
 */
  it('should give error on patch data in database when data is empty', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.emptyData)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });
/**
 *Testing patch method to check error when username is empty
 *
 * PATCH request
 *
 *
 */
  it('should give error on patch data in database when username is empty', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.emptyUsername)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });

  /**
 *Testing patch method to check error when username is not declared
 *
 * PATCH request
 *
 *
 */
  it('should give error on patch data in database when username is not declared', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.noUsername)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });
  /**
 *Testing patch method to check error when role is empty
 *
 * PATCH request
 *
 *
 */

  it('should give error on patch data in database when role is empty', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.emptyRole)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });
  /**
 *Testing patch method to check error when role is not declared
 *
 * PATCH request
 *
 *
 */
  it('should give error on patch data in database when role is not declared', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.noRole)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.emptyDataValueError);
              return done();
            });
    return null;
  });
/**
 *Testing patch method to check error when given role not available for a domain
 *
 * PATCH request
 *
 *
 */

  it('should give error on patch data in database when role is not exist for a domain', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.noRoleExist)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.noRoleInDomain);
              return done();
            });
    return null;
  });
       /**
 *Testing patch method to check error when URI parameter is not given properly
 *
 * PATCH request
 *
 *
 */


  it('should through error resource not found while getting data', (done) => {
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
       /**
 *Testing patch method to update role for a members in a domain when role exist for a domain
 * PATCH request
 *
 *
 */

  it('should update the role for the members in a community', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.updateMembers)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.successUpdatedMembers);
              return done();
            });
    return null;
  });
     /**
 *Testing patch method to check error when given data exist with same role
 *
 * PATCH request
 *
 *
 */
  it('should give error on patch data while updating same data', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.updateMembers)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.dataExist);
              return done();
            });
    return null;
  });
     /**
 *Testing patch method to check error when given data is not exist
 *
 * PATCH request
 *
 *
 */

  it('should give error on patch data while updating unavilable data', (done) => {
    request(app)
            .patch(`${uri}wipro.blr/members`)
            .send(value.updateNotAvailableMembers)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.dataNotExist);
              return done();
            });
    return null;
  });

   /**
 *Testing delete method to check error when given data is not exist
 *
 * DELETE request
 *
 *
 */

  it('should give error on delete data in database when data not exist in database', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.addMembers)
            .expect(400)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.noDataExist);
              return done();
            });
    return null;
  });

  /**
 *Testing get method to get details of a particular domain when domain is in uppercase
 *
 * GET request
 *
 *
 */
  it('should get data for specified domain when in upper case', (done) => {
    request(app)
            .get(`${uri}wiPro.bLr/members`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('MemberDetails').a('Array');
              done();
            });
  });

/**
 *Testing delete method to delete member details
 *
 * DELETE request
 *
 *
 */
  it('should delete if member exists', (done) => {
    request(app)
            .delete(`${uri}wipro.blr/members`)
            .send(value.updateMembers)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.successDeletedMember);
              return done();
            });
    return null;
  });


/**
 *Run after all test cases in this block
 *
 * after hook to execute arbitrary code after this block
 *
 *
 */
  after('', () => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.blr'`);
    client.execute(`DELETE FROM ${COMMUNITY_ROLES_TABLE} where domain='wipro.blr'`);
  });
});
