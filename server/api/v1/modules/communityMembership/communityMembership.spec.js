const should = require('chai').should();

const app = require('../../../../app');

const request = require('supertest');

const model = require('cassandra-driver');

const connectionString = require('../../../../config');

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
                console.log(result.rows[0]);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('Stack-Route-Immersive');
                result.rows[0].username.should.be.equal('Aravindh');
                result.rows[0].role.should.be.equal('Trainee-FullStack-Developer');
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
  });

  it('Update a community member', (done) => {
    request(app)
            .patch('/api/v1/membership/member/:username/community/:domain/role')
            .send({
              role: 'Trainee-FullStack',
            })
            .then(() => {
              client.execute(`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive' AND username='Aravindh' IF EXISTS`, (err, result) => {
                // console.log(result.rows);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('Stack-Route-Immersive');
                result.rows[0].username.should.be.equal('Aravindh');
                // result.rows[0].role.should.be.equal('Trainee-FullStack');
                console.log(result.rows);
              });
              done();
            })
            .catch((err) => {
              done(err);
            });
  });
  // after('',() =>{
  //   client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive'`);
  // });
});

/* after('', () => {
  client.execute("DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='Stack-Route-Immersive'");
  });


 const should = require('chai').should();

const app = require('../../../../app');

const model = require('cassandra-driver');

const connectionString = require('../../../../config');

const request = require('supertest');

const COMMUNITY_MEMBERSHIP_TABLE = 'communitymembership';

describe('Add new member to community', function() {
  before(function() {
    let client = new model.Client({
      contactPoints: [connectionString.contact],
      protocolOptions: { port: connectionString.port },
      keyspace: connectionString.keyspace,
    });
    const query = (`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} `);
    client.execute(query);
  });

  it('Add new member to the community',function(done){
    request(app)
    .post('/community/member/role', {
      domain: 'Wipro',
      username: 'Aravindh',
      role: 'FullStackDeveloper'
    })
    .then((result) => {
      result.domain.should.be('Wipro');
      result.username.should.be('Aravindh');
      result.role.should.be('FullStackDeveloper');

      let client = new model.Client({
      contactPoints: [connectionString.contact],
      protocolOptions: { port: connectionString.port },
      keyspace: connectionString.keyspace,
    });

      const query = (`SELECT * FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain = 'mydomain'`)
      client.execute(query, (err, result) => {
        result.rows.length.should.be.equal(1);
        result.rows[0].domain.should.be.equal('Wipro');
        result.rows[0].username.should.be.equal('Aravindh');
        result.rows[0].role.should.be.equal('FullStackDeveloper');
      });
      done(result);
    })
    .catch((err) => {
      done(err);
    })
  });
  after(function() {
    let client = new model.Client({
      contactPoints: [connectionString.contact],
      protocolOptions: { port: connectionString.port },
      keyspace: connectionString.keyspace,
    });
    const query = (`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE}`);
    client.execute(query);
  });
});

const should = require('chai').should();

const app = require('../../../../app');

const request = require('supertest');

const membershipService = require('./communityMembership.service');

const dataValue = require('./communityMembership.testData');

describe('Add new member to community', function() {
  it('Member added to the community', function(done) {
    request(app)
    .post('/community/member/role')
    .send(dataValue.)
    .end((err,results) => {
      if(err){
        return done(err);
      }else{
        return res.body.should.be.equal(dataValue.memberAdded);
      }
    });
    return done();
  });

  it('Member not added enter roles ', function(done) {
    request(app)
    .post('/community/member/role')
    .send(dataValue.)
    .end((err,results) => {
      if(err){
        return done(err);
      }else{
        return res.body.should.be.equal(dataValue.memberDataInsufficient);
      }
    });
    return done();
  });
}*/
