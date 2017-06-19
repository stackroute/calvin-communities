const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const app = require('../../../../app');

const request = require('supertest');

const service = require('./communitytools.services');

const value = require('./test.dao');


describe('/get data from database for specified domain', () => {
  it('should get data for specified domain', (done) => {
    request(app)
            .get('/api/v1/communitytools/wipro.blr')
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              service.getTools((error, result) => {
                if (error) {
                  done(error);
                  return;
                }
                if (result) { res.body.should.deep.equal(result.rows); }
              });
              done();
            });
  });


    // nothing given for domain, username or owner

  it('should give error on post data in database as no values are given', (done) => {
    request(app)
            .post('/api/v1/communitytools')
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.wrongdata);
            });
    done();
  });

    // username not passed

  it('should give error on post data in database as name is not given', (done) => {
    request(app)
            .post('/api/v1/communitytools')
            .send(value.wrongvalue)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.wrongdata);
              return done();
            });
    return done();
  });


    // username string empty
  it('should give error on post data in database as name property is empty', (done) => {
    request(app)
            .post('/api/v1/communitytools')
            .send(value.wrongvalue)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.wrongdata);
            });
    return done();
  });


    // post data in database, only necessary columns
  it('should post data in database for columns given', (done) => {
    request(app)
            .post('/api/v1/communitytools')
            .send(value.tools)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.toolcreated);
            });
    done();
  });


    // post data in database, all values given
  it('should post data in database for all columns ', (done) => {
    request(app)
                .post('/api/v1/communitytools')
                .send(value.toolsAll)
                .end((err, res) => {
                  if (err) {
                    done(err);
                    return;
                  }
                  res.body.should.be.deep.equal(value.toolcreated);
                });
    done();
  });


    // patch data in database
  it('should patch data in database, update community', (done) => {
    request(app)
            .patch(`/api/v1/communitytools/${value.patch.domain}/${value.patch.tool}`)
            .send(value.updatetools)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.modified);
            });
    done();
  });


   //  Delete a row from table
  it('should delete data in database for a given domain and tool name', (done) => {
    request(app)
            .delete(`/api/v1/communitytools/${value.patch.domain}/${value.patch.tool}`)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.deleted);
            });
    done();
  });
});
