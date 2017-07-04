const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const expect = chai.expect;
const app = require('../../../../app');

const request = require('supertest');

const values = require('./membership.testData');

const uri = '/api/v1/membership/';

const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


describe('Test cases for insert and update data when invite or request occured', () => {
  before(() => {
        // runs before all tests in this block
    client.execute('insert into membership (domain, username, role) values(\'doctor.wipro.blr\',\'mohan\',\'Trainee-FullStack-Developer\');');
    client.execute('insert into membership (domain, username, role) values(\'engineer.wipro.blr\', \'mohan\',\'Developer\');');
  });

/* ----------------------TEST CASE FOR GET METHOD-------------------------------------------*/

    it('should get member detail for specified community', (done) => {
    request(app)
            .get(`${uri}member/mohan/communities`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('requests').a('Array');
              done();
            });
  });

  /* ----------------------TEST CASE FOR POST METHOD-------------------------------------------*/
  it('should give error on post data in database as domain is empty', (done) => {
    request(app)
            .post(`${uri}member/community/role`)
            .send(values.noDomainValue)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongData);
              done();
            });
    return null;
  });

    it('should give error on post data in database as username property is empty', (done) => {
    request(app)
            .post(`${uri}member/community/role`)
            .send(values.noUsernameValue)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongData);
              done();
            });
    return null;
  });

  it('should give error on post data in database as role property is empty', (done) => {
    request(app)
            .post(`${uri}member/community/role`)
            .send(values.noRoleValue)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongData);
              done();
            });
    return null;
  });

    it('should post data in database', (done) => {
    request(app)
            .post(`${uri}member/community/role`)
            .send(values.memberDetails1)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.memberDetails);
              done();
            });
    return null;
  });

/* ----------------------TEST CASE FOR PATCH METHOD-------------------------------------------*/
    it('should update role of a member1 for a community in database, update community', (done) => {
    request(app)
            .patch(`${uri}community/doctor.wipro.blr/role/member/mohan`)
            .send(values.updateRoles2)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.modified);
              done();
            });
    return null;
  });

    it('should not update when the role is empty', (done) => {
    request(app)
            .patch(`${uri}community/doctor.wipro.blr/role/member/mohan`)
            .send(values.noRoleValueUpdate)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongData);
              done();
            });
    return null;
  });

  /* ----------------------TEST CASE FOR DELETE METHOD-------------------------------------------*/
  it('should delete data in database for a given domain and username', (done) => {
    request(app)
            .delete(`${uri}removemember/mohan/community/doctor.wipro.blr`)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.deleted);
              done();
            });
    return null;
  });

