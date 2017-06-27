require('chai').should();

const app = require('../../../../app');

const request = require('supertest');

const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

const MEMBERSHIP_TABLE = 'members';

describe('Members community details and update it', () => {
  before(() => {
        // runs before all tests in this block

    client.execute(`DELETE FROM ${MEMBERSHIP_TABLE} where username='Aravindh'`);
  });

  it('Add new member to a community', (done) => {
    request(app)
            .post('/api/v1/members/member/community/role')
            .send({
              domain: 'Stack-Route-Immersive',
              username: 'Aravindh',
              role: 'Trainee-FullStack-Developer',
            })
            .then(() => {
              client.execute(`SELECT * FROM ${MEMBERSHIP_TABLE} where username='Aravindh' AND domain='Stack-Route-Immersive'`, (err, result) => {
                // console.log(result.rows[0]);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('Stack-Route-Immersive');
                result.rows[0].username.should.be.equal('Aravindh');
                result.rows[0].role.should.be.equal('Trainee-FullStack-Developer');
                // console.log('Data Added...');
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
  });

  it('Update a community member', (done) => {
    request(app)
            .patch('/api/v1/members/community/Stack-Route-Immersive/role/member/Aravindh')
            .send({
              role: 'Trainee-FullStack',
            })
            .then(() => {
              client.execute(`SELECT * FROM ${MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive' AND username='Aravindh' `, (err, result) => {
                if (!err) {
                  result.rows.length.should.be.equal(1);
                  result.rows[0].domain.should.be.equal('Stack-Route-Immersive');
                  result.rows[0].username.should.be.equal('Aravindh');
                  result.rows[0].role.should.be.equal('Trainee-FullStack');
                  // console.log(result.rows[0]);
                  // console.log('Updated');
                } if (err) {
                  // console.log(result.rows[0]);
                  // console.log('This member is not a part of a community');
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
      .get('/api/v1/members/member/Aravindh/communities')
      .then(() => {
        client.execute(`SELECT * FROM ${MEMBERSHIP_TABLE} where username='Aravindh' `, (err, result) => {
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
            .delete('/api/v1/members/removemember/Aravindh/community/Stack-Route-Immersive')
            .then(() => {
              client.execute(`SELECT * FROM ${MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive' AND username='Aravindh' `, (err) => {
                if (!err) {
                 // console.log('Data deleted....');
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

  it('Again adding new member to a community', (done) => {
    request(app)
            .post('/api/v1/members/member/community/role')
            .send({
              domain: 'Stack-Route-Immersive',
              username: 'Aravindh',
              role: 'Trainee-FullStack-Developer',
            })
            .then(() => {
              client.execute(`SELECT * FROM ${MEMBERSHIP_TABLE} where username='Aravindh' AND domain='Stack-Route-Immersive'`, (err, result) => {
               // console.log(result.rows[0]);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('Stack-Route-Immersive');
                result.rows[0].username.should.be.equal('Aravindh');
                result.rows[0].role.should.be.equal('Trainee-FullStack-Developer');
               // console.log('Again data added...');
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
  });

  after('', () => {
    client.execute(`DELETE FROM ${MEMBERSHIP_TABLE} where username='Aravindh' and domain ='Stack-Route-Immersive'`);
  });
});
