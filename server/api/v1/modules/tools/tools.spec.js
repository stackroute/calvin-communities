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

      .end((error, results) => {
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
            return null;
          });
        }
      });
    return null;
  });
  it('should throw error if value is not found', (done) => {
    request(app)
      .get(`${uri}wipro.blr`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from tools where toolid=\'wipro.blr\'', (err, result) => {
            if (!err) {
              // console.log('Result from testcase', result.rows.length);
              result.rows.length.should.deep.equal(0);
              results.body.should.deep.equal(value.notFound);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  it('should get data for specified domain when domain has upper cases', (done) => {
    request(app)
      .get(`${uri}engineer.wIpRo.blr`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from tools where toolid=\'engineer.wipro.blr\'', (err, result) => {
            if (!err) {
              result.rows.length.should.deep.equal(1);
              expect(results.body).to.have.property('toolid').a('string');
              expect(results.body).to.have.property('communities').a('Array');
              return done();
            }
            return null;
          });
        }
      });
    return null;
  });
  it('should post data to database', (done) => {
    toolController.postTools(value.tools, 'sandhya', (error, res) => {
      if (!error) {
        client.execute('SELECT * from tools where toolid=\'quora\'', (err, result) => {
          if (!error) {
            result.rows.length.should.deep.equal(1);
            result.rows[0].toolid.should.be.equal('quora');
            const isPresent = result.rows[0].domains.filter(domain => domain === 'sandhya');
            isPresent.length.should.be.equal(1);
            return done();
          }
          return null;
        });
      } else if (!res) {
        return done(error);
      }
      return null;
    });
    return null;
  });
  it('should post data to database when in upper case', (done) => {
    toolController.postTools(value.Capstools, 'balaji', (error, res) => {
      if (!error) {
        client.execute('SELECT * from tools where toolid=\'quora\'', (err, result) => {
          if (!err) {
            result.rows.length.should.deep.equal(1);
            result.rows[0].toolid.should.be.equal('quora');
            const isPresent = result.rows[0].domains.filter(domain => domain === 'balaji');
            isPresent.length.should.be.equal(1);
            return done();
          }
          return null;
        });
      } else if (!res) {
        return done(error);
      }
      return null;
    });
    return null;
  });
  it('should post multiple data to database', (done) => {
    let iterateData = 0;
    toolController.postTools(value.multipletools, 'sandhya', (error, res) => {
      if (!error) {
        value.multipletools.forEach((element) => {
          client.execute(`SELECT * from tools where toolid='${element.toolId}'`, (err, result) => {
            if (!error) {
              result.rows.length.should.deep.equal(1);
              result.rows[0].toolid.should.be.equal(element.toolId);
              const isPresent = result.rows[0].domains.filter(domain => domain === 'sandhya');
              isPresent.length.should.be.equal(1);
              iterateData += iterateData;
            }
          });
        });
        if (iterateData === value.multipletools) {
          iterateData.should.deep.equal(value.multipletools.length);
          done();
        } else {
          done(error);
        }
      } else if (!res) {
        return done(error);
      }
      return null;
    });
    return null;
  });

  after('', () => {
    client.execute("DELETE FROM tools where toolid='engineer.wipro.blr';");
    client.execute("DELETE FROM tools where toolid='doctors.blr';");
    client.execute("DELETE FROM tools where toolid='doctors.blr';");
    /*    client.execute("DELETE FROM tools where toolid='quora';");
        client.execute("DELETE FROM tools where toolid='sermo';");
        client.execute("DELETE FROM tools where toolid='stack-overflow';");*/
  });
});
