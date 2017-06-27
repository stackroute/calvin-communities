/* require('chai').should();

const app = require('../../../../app');

const request = require('supertest');

const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

const COMMUNITY_MEMBERSHIP_TABLE = 'communitymembership';

describe('Create a community and update it', () => {
  before(() => {
        // runs before all tests in this block

    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive'`);
  });

  it('Add new member to a community', (done) => {
    request(app)
            .post('/api/v1/membership/community/member/role')
            .send({
              domain: 'Stack-Route-Immersive',
              username: 'Aravindh',
              role: 'Trainee-FullStack-Developer',
            })
            .then(() => {
              client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive'`, (err, result) => {
                    // console.log(result.rows[0]);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('Stack-Route-Immersive');
                result.rows[0].username.should.be.equal('Aravindh');
                result.rows[0].role.should.be.equal('Trainee-FullStack-Developer');
                    // console.log('Data added...');
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
  });

  it('Update a community member', (done) => {
    request(app)
            .patch('/api/v1/membership/member/Aravindh/community/Stack-Route-Immersive/role')
            .send({
              role: 'Trainee-FullStack',
            })
            .then(() => {
              client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive' AND username='Aravindh' `, (err, result) => {
                    // console.log(result.rows);
                if (!err) {
                  result.rows.length.should.be.equal(1);
                  result.rows[0].domain.should.be.equal('Stack-Route-Immersive');
                  result.rows[0].username.should.be.equal('Aravindh');
                  result.rows[0].role.should.be.equal('Trainee-FullStack');
                        // console.log(result.rows);
                }
                if (err) {
                        // console.log('This community not have a member of this name...!!');
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
  });

  it('Get a member of community with role', (done) => {
    request(app)
            .get('/api/v1/membership/community/Stack-Route-Immersive/members')
            .then(() => {
              client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive' `, (err, result) => {
                if (!err) {
                  result.rows.length.should.be.equal(1);
                        // console.log(result.rows);
                        // console.log('Data is retrieved from a table');
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
  });
  it('Delete a community member', (done) => {
    request(app)
            .delete('/api/v1/membership/community/Stack-Route-Immersive/removemember/Aravindh')
            .then(() => {
              client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive' AND username='Aravindh' `, (err) => {
                if (!err) {
                        // console.log('Data Deleted..');
                }
                if (err) {
                        // console.log('This community not have a member of this name...!!');
                }
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
  });
  it('Add new member to a community', (done) => {
    request(app)
            .post('/api/v1/membership/community/member/role')
            .send({
              domain: 'Stack-Route-Immersive',
              username: 'Aravindh',
              role: 'Trainee-FullStack-Developer',
            })
            .then(() => {
              client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive'`, (err, result) => {
                    //  console.log(result.rows[0]);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('Stack-Route-Immersive');
                result.rows[0].username.should.be.equal('Aravindh');
                result.rows[0].role.should.be.equal('Trainee-FullStack-Developer');
                    // console.log('Data added again...');
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
  });


  after('', () => {
    client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive'`);
  });
});
*/
