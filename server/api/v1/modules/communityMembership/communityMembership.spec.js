/* const should = require('chai').should();

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
});*/
