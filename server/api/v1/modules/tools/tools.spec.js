const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const expect = chai.expect;

const app = require('../../../../app');

const request = require('supertest');

const value = require('./test.dao');

const uri = '/api/v1/tools/';

const model = require('cassandra-driver');

const connectionString = require('../../../../config');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


describe('get all tools from database for specified domain', () => {
  before(() => {
        // runs before all tests in this block
    client.execute('insert into tools (domain, tools) values(\'engineer.wipro.blr\',  {\'forum\', \'quora\'});');
  });

  it('should get data for specified domain', (done) => {
    request(app)
            .get(`${uri}engineer.wipro.blr`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('tools').a('Array');
              done();
            });
    return null;
  });
  it('should throw error if value is not found', (done) => {
    request(app)
            .get(`${uri}wipro.blr`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .end((err, res) => {
              if (err) {
                return done();
              }
              res.body.should.deep.equal(value.notFound);
              return done();
            });
    return null;
  });

  it('should get data for specified domain when domain has upper cases', (done) => {
    request(app)
            .get(`${uri}engineer.wIpRo.blr`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('tools').a('Array');
              done();
            });
    return null;
  });

    // nothing given for domain, or tool name

  it('should give error on post data in database when no values are given', (done) => {
    request(app)
            .post(`${uri}`)
            .expect(500)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.catchError);
              done();
            });
    return null;
  });

  it('should give error on post data in database when domain is not given', (done) => {
    request(app)
            .post(`${uri}`)
            .send(value.wrongtools)
            .expect(404)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.nullValue);
              return done();
            });
    return null;
  });


    // domain string empty
  it('should give error on post data in database when domain property is empty', (done) => {
    request(app)
            .post(`${uri}`)
            .send(value.wrongtool)
            .expect(404)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.nullValue);
              return done();
            });
    return null;
  });


    // patch data in database
  it('should patch data in database, update community', (done) => {
    request(app)
            .patch(`${uri}${value.patch.domain}`)
            .send(value.updatetools)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.modified);
              done();
            });
    return null;
  });


    //  Delete a row from table
  it('should delete data in database for a given domain and tool name', (done) => {
    request(app)
            .delete(`${uri}engineer.wipro.blr/forum`)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.deleted);
              done();
            });
    return null;
  });

  it('should delete data in database for a given domain and tool name in upper case', (done) => {
    request(app)
            .delete(`${uri}Engineer.Wipro.blr/forum`)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.deleted);
              done();
            });
    return null;
  });

  it('should delete throw error message when domain does not exist in the database', (done) => {
    request(app)
            .delete(`${uri}engineers.wipro.blr/forum`)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.domainErr);
              done();
            });
    return null;
  });

  after('', () => {
    client.execute("DELETE FROM communitytools where domain='doctor.wipro.blr';");
    client.execute("DELETE FROM communitytools where domain='engineer.wipro.blr';");
  });
});
