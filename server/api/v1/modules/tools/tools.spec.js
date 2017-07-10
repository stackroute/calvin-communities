const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const expect = chai.expect;

const app = require('../../../../app');

const request = require('supertest');

const value = require('./test.dao');

const uri = '/api/v1/tools/';

const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const toolController = require('./tools.controller');

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
      .get(`${uri}doctors.blr`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)

    .end(function(error, results) {
      if (!error) {
        client.execute('SELECT * from tools where toolid=\'doctors.blr\'', (err, result) => {
          if (!err) {
            result.rows.length.should.deep.equal(1);
            result.rows[0].toolid.should.deep.equal(results.body.toolid);
             result.rows[0].domains.length.should.be.equal(2);
            expect(results.body).to.have.property('toolid').a('string');
            expect(results.body).to.have.property('communities').a('Array');
            return done();
          }
        });
      }
    })
    return null;
  });
  it('should throw error if value is not found', function(done) {
    request(app)
      .get(`${uri}wipro.blr`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .end(function(error, results) {
        if (!error) {
          client.execute('SELECT * from tools where toolid=\'wipro.blr\'', (err, result) => {
            if (!err) {
              console.log('Result from testcase', result.rows.length);
              result.rows.length.should.deep.equal(0);
              results.body.should.deep.equal(value.notFound);
              return done();
            }
            done(err);
          });
        }
      })

  });

  it('should get data for specified domain when domain has upper cases', (done) => {
    request(app)
      .get(`${uri}engineer.wIpRo.blr`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(function(error, results) {
        if (!error) {
          client.execute('SELECT * from tools where toolid=\'engineer.wipro.blr\'', (err, result) => {
            if (!err) {
              result.rows.length.should.deep.equal(1);
              expect(results.body).to.have.property('toolid').a('string');
              expect(results.body).to.have.property('communities').a('Array');
              return done();
            }
          });
        }
      })
    return null;
  });
  it('should post data to database', (done) => {
    toolController.postTools(value.tools, 'sandhya', (err, res) => {
      if (!err) {
        res.should.deep.equal(value.posted);
        return done(null, res);
      }
      done(err);
    });
    return null;
  });

  after('', () => {
    client.execute("DELETE FROM tools where toolid='engineer.wipro.blr';");
    client.execute("DELETE FROM tools where toolid='doctors.blr';");
    client.execute("DELETE FROM tools where toolid='doctors.blr';");

  });
});
