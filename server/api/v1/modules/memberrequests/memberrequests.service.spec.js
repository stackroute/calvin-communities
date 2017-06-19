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

    client.execute("DELETE FROM memberrequest where domain='Godrej';");
  });

  it('insert a data into the table', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send({
              domain: 'arts',
              status: 'invitesent',
              person: ['blossoms@gmail.com'],
              member: 'prakhar',
              type: 'invite',
            })
            .then(() => {
                // console.log(res.rows);
              client.execute("SELECT * from memberrequest where domain='arts';", (err, result) => {
                console.log(result.rows);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('arts');
                result.rows[0].status.should.be.equal('invitesent');
                result.rows[0].type.should.be.equal('invite');
                result.rows[0].member.should.be.equal('prakhar');
                result.rows[0].person.should.be.equal('blossoms@gmail.com');
              });
              return done();
            })
            .catch(err => done(err));
  });

  it('Update a status', (done) => {
    request(app)
            .patch('/api/v1/memberrequests/arts/blossoms@gmail.com')
            .send({
              status: 'accepted',
            })
            .then(() => {
              client.execute("SELECT * from memberrequest where domain='arts';", (err, result) => {
                console.log(result.rows);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('arts');
                result.rows[0].status.should.be.equal('accepted');
                result.rows[0].type.should.be.equal('invite');
                result.rows[0].member.should.be.equal('prakhar');
                result.rows[0].person.should.be.equal('blossoms@gmail.com');
              });
              return done();
            })
            .catch(err => done(err));
  });


  after('', () => {
    client.execute("DELETE FROM memberrequest where domain='Godrej';");
  });
});
