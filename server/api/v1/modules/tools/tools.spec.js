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


describe('Test cases for all tools in a community', () => {
  before(() => {
        // runs before all tests in this block
    client.execute('insert into tools (toolid, domains) values(\'engineer.wipro.blr\',  {\'forum\', \'quora\'});');
    client.execute('insert into tools (toolid, domains) values(\'doctors.blr\',  {\'forum\', \'quora\'});');
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
              expect(res.body).to.have.property('toolid').a('string');
              expect(res.body).to.have.property('communities').a('Array');
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
              expect(res.body).to.have.property('toolid').a('string');
              expect(res.body).to.have.property('communities').a('Array');
              done();
            });
    return null;
  });


  after('', () => {
    client.execute("DELETE FROM tools where toolid='engineer.wipro.blr';");
    client.execute("DELETE FROM tools where toolid='doctors.blr';");
  });
});
