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

    client.execute("DELETE FROM memberrequest where domain='design';");
  });

  it('insert a data into the table', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send({
              domain: 'design',
              status: 'requested',
              person: ['flower@gmail.com'],
              member: '',
              type: 'request',
            })
            .then(() => {
                // console.log(res.rows);
              client.execute("SELECT * from memberrequest where domain='design';", (err, result) => {
                console.log("hi"+result.rows);
                result.rows.length.should.be.equal(1);
                result.rows[1].domain.should.be.equal('design');
                result.rows[1].status.should.be.equal('requested');
                result.rows[1].type.should.be.equal('request');
                result.rows[1].member.should.be.equal('');
                result.rows[1].person.should.be.equal('flower@gmail.com');
              });
              return done();
            })
            .catch(err => done(err));
  });

  it('Update a status', (done) => {
    request(app)
            .patch('/api/v1/memberrequests/design/flower@gmail.com')
            .send({
              status: 'approved',
              member: 'master'
            })
            .then(() => {
              client.execute("SELECT * from memberrequest where domain='design';", (err, result) => {
                console.log(result.rows);
                result.rows.length.should.be.equal(1);
                result.rows[0].domain.should.be.equal('domain');
                result.rows[0].status.should.be.equal('approved');
                result.rows[0].type.should.be.equal('request');
                result.rows[0].member.should.be.equal('master');
                result.rows[0].person.should.be.equal('flower@gmail.com');
              });
              return done();
            })
            .catch(err => done(err));
  });


  after('', () => {
    client.execute("DELETE FROM memberrequest where domain='Godrej';");
  });
});
