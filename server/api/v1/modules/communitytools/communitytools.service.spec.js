const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const app = require('../../../../app');

const request = require('supertest');

const model = require('cassandra-driver');

const value = require('./test.dao')

const connectionString = require('../../../../config');

let client = new model.Client({
    contactPoints: [connectionString.contact],
    protocolOptions: { port: connectionString.port },
    keyspace: connectionString.keyspace,
});

describe('Create a community and update it', function() {

    before(function() {
        // runs before all tests in this block

        client.execute("DELETE FROM communitytools where domain='Engineer.wipro.blr';");
    });

    it('Add a new tool for a community', function(done) {
        request(app)
            .post('/api/v1/communitytools')
            .send({
                domain: "Engineer.wipro.blr",
                id: "Quora",
                action: ["'broadcast'", "'write'"],
                events: ["'postmessage'"]
            })
            .then((res) => {
                // console.log(res.rows);
                client.execute("SELECT * from communitytools where domain='Engineer.wipro.blr'", (err, result) => {
                    console.log(result.rows);
                    result.rows.length.should.be.equal(1);
                    result.rows[0].domain.should.be.equal('Engineer.wipro.blr');
                    result.rows[0].toolid.should.be.equal('Quora');
                });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('Update a community tool', function(done) {
        request(app)
            .patch('/api/v1/communitytools/Engineer.wipro.blr/Quora')
            .send({
                action: 'publish',
                events: 'post-self',
            })
            .then((res) => {
                 client.execute("SELECT * from communitytools where domain='Engineer.wipro.blr'", (err, result) => {
                     console.log(result.rows);
                     result.rows.length.should.be.equal(1);
                     result.rows[0].domain.should.be.equal('Engineer.wipro.blr');
                     result.rows[0].toolid.should.be.equal('Quora');
                 });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });


    after('', function() {
        client.execute("DELETE FROM communitytools where domain='Engineer.wipro.blr';");
    })
});
