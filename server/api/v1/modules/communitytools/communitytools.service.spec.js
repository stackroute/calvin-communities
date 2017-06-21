const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const app = require('../../../../app');

const request = require('supertest');

const model = require('cassandra-driver');

const connectionString = require('../../../../config');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

describe('Create a community and update it', () => {
  before(() => {
        // runs before all tests in this block

    // client.execute("DELETE FROM communitytools where domain='Engineer.wipro.blr';");
  });

  it('Add a new tool for a community', (done) => {
    request(app)
            .post('/api/v1/communitytools')
            .send([{
              domain: 'Engineer.wipro.blr',
              toolId: 'Quora',
              actions: ["'broadcast'", "'write'"],
              activityEvents: ["'postmessage'"],
            }])
            .then(() => {
                // console.log(res.rows);
              client.execute("SELECT * from communitytools where domain='Engineer.wipro.blr'", (err, result) => {
                    // console.log(result.rows);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('Engineer.wipro.blr');
                result.rows[0].toolid.should.be.equal('Quora');
              });
              return done();
            })
            .catch(err => done(err));
  });

  it('Update a community tool', (done) => {
    request(app)
            .patch('/api/v1/communitytools/Engineer.wipro.blr/Quora')
            .send({
              action: 'publish',
              events: 'post-self',
            })
            .then(() => {
              client.execute("SELECT * from communitytools where domain='Engineer.wipro.blr'", (err, result) => {
                // console.log(result.rows);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('Engineer.wipro.blr');
                result.rows[0].toolid.should.be.equal('Quora');
                return done();
              });
              // console.log('hello');
              return done();
            })
            .catch((err) => {
              done(err); // console.log(err);
            });
  });


  after('', () => {
    // client.execute("DELETE FROM communitytools where domain='Engineer.wipro.blr';");
  });
});
