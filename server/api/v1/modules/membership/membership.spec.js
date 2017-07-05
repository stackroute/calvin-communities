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

  it('should get data for specified username', (done) => {
    request(app)
            .get(`${uri}mohan`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('user').a('string');
              expect(res.body).to.have.property('domain').a('Array');
              done();
            });
    return null;
  });
  it('should throw error if value is not found', (done) => {
    request(app)
            .get(`${uri}mohan`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .end((err, res) => {
              if (err) {
                return done();
              }
              res.body.should.deep.equal(values.notFound);
              return done();
            });
    return null;
  });

  it('should get data for specified username when username has upper cases', (done) => {
    request(app)
            .get(`${uri}mohan`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('user').a('string');
              expect(res.body).to.have.property('domain').a('Array');
              done();
            });
    return null;
  });


  after('', () => {
    client.execute("DELETE FROM membership where domain='doctor.wipro.blr' and username='mohan';");
    client.execute("DELETE FROM membership where domain='engineer.wipro.blr' and username='mohan';");
  });
});
