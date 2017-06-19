const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const app = require('../../../../app');

const request = require('supertest');

const model = require('cassandra-driver');

const value = require('./test.dao');

const connectionString = require('../../../../config');

const client = new model.Client({
    contactPoints: [connectionString.contact],
    protocolOptions: { port: connectionString.port },
    keyspace: connectionString.keyspace,
});

describe('Create a row for a community and its corresponding tools and update it', () => {
    before(() => {
        // runs before all tests in this block

        client.execute("DELETE FROM tools where domain='Engineer.wipro.blr';");
    });

    it('Add a new tool for a community', (done) => {
        request(app)
            .post('/api/v1/tools')
            .send({
                domain: 'Engineer.wipro.blr',
                tools: ["'broadcast'", "'write'"],
            })
            .then((res) => {
                // console.log(res.rows);
                client.execute("SELECT * from tools where domain='Engineer.wipro.blr'", (err, result) => {
                    if (err) {
                        return done(err);
                    }
                    console.log(result.rows);
                    result.rows.length.should.be.equal(1);
                    result.rows[0].domain.should.be.equal('Engineer.wipro.blr');
                });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('Update a community tool', (done) => {
        request(app)
            .patch('/api/v1/tools/Engineer.wipro.blr/Quora')
            .send({
                tool: 'publish',

            })
            .then((res) => {
                client.execute("SELECT * from tools where domain='Engineer.wipro.blr'", (err, result) => {
                    if (err) {
                        return done(err);
                    }
                    console.log(result.rows);
                    result.rows.length.should.be.equal(1);
                    result.rows[0].domain.should.be.equal('Engineer.wipro.blr');
                });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });


    after('', () => {
        client.execute("DELETE FROM tools where domain='Engineer.wipro.blr';");
    });
});
