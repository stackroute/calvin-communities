const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const app = require('../../../../app');

const request = require('supertest');

const service = require('./tools.services');

const value = require('./test.dao');


describe('/get all tools from database for specified domain', () => {
    it('should get data for specified domain', (done) => {
        request(app)
            .get('/api/v1/tools/${value.patch.domain}')
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                service.getTools((err, result) => {
                    if (err) {
                        done(err);
                        return;
                    }

                    if (result) { res.body.should.deep.equal(result.rows); }
                });
                setTimeout(done(), 1000);
            });
    });


    // nothing given for domain, username or owner

    it('should give error on post data in database as no values are given', (done) => {
        request(app)
            .post('/api/v1/tools')
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                res.body.should.deep.equal(value.wrongdata);
            });
        setTimeout(done(), 1000);
    });


    // username string empty
    it('should give error on post data in database as name property is empty', (done) => {
        request(app)
            .post('/api/v1/tools')
            .send(value.wrongtools)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                res.body.should.deep.equal(value.wrongdata);
            });
        setTimeout(done(), 1000);
    });


    // post data in database, only necessary columns
    it('should post data in database for columns given', (done) => {
        request(app)
            .post('/api/v1/tools')
            .send(value.tools)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                res.body.should.deep.equal(value.toolcreated);
            });
        setTimeout(done(), 1000);
    });


    // patch data in database
    it('should patch data in database, update community', (done) => {
        request(app)
            .patch(`/api/v1/tools/${value.patch.domain}`)
            .send(value.updatetools.tool)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                res.body.should.deep.equal(value.modified);
            });
        setTimeout(done(), 1000);
    });


    //  Delete a row from table
    it('should delete data in database for a given domain and tool name', (done) => {
        request(app)
            .delete(`/api/v1/tools/${value.patch.domain}`)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                res.body.should.deep.equal(value.deleted);
            });
        setTimeout(done(), 1000);
    });
});
