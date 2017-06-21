require('chai').should();
const app = require('../../../../app');
const request = require('supertest');
const values = require('./test.dao');
const service = require('./memberrequests.service');

// throw error when person email is null
describe('/post data in database, no email data', () => {
  it('should give error on post data in database as no email values is given', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send(values.noemail)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.be.equal(values.wrongdata);
            });
    setTimeout(done(), 1000);
  });
});

// throw error when domain is null
describe('/post data in database, no domain data', () => {
  it('should give error on post data in database as no domain values is given', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send(values.nodomainname)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongdata);
            });
    setTimeout(done(), 1000);
  });
});

// throw error when wrong value in status

describe('/post data in database, no data given', () => {
  it('should give error on post data in database as no domain values is given', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send(values.statuswrong)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongdata);
            });
    setTimeout(done(), 1000);
  });
});

// created
describe('/post data in database', () => {
  it('post method for insert values into the data', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send(values.data)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.rowcreated);
            });
    setTimeout(done(), 1000);
  });
});


// code for updating


// error through when status is wrongly given
describe('/update data in database, no data given', () => {
  it('should give error on patch data in database as status values is wrongly given', (done) => {
    request(app)
                .patch('/api/v1/memberrequests/doctor/saran@gmail.com')
                .send(values.checkrequesttype)
                .end((err, res) => {
                  if (err) {
                    done(err);
                    return;
                  }
                  res.body.should.deep.equal(values.wrongdata);
                });
    setTimeout(done(), 1000);
  });
});

// error through when member is empty for type request

describe('/update data in database, no data given', () => {
  it('should give error on patch data in database when member is empty', (done) => {
    request(app)
                        .patch('/api/v1/memberrequests/doctor/saran@gmail.com')
                        .send(values.emptyapprover)
                        .end((err, res) => {
                          if (err) {
                            done(err);
                            return;
                          }
                          res.body.should.deep.equal(values.wrongdata);
                        });
    setTimeout(done(), 1000);
  });
});

// update status for request type
describe('/update data in database', () => {
  it('should modify data in database when values are given', (done) => {
    request(app)
                        .patch('/api/v1/memberrequests/doctor/saran@gmail.com')
                        .send(values.valueforrequest)
                        .end((err, res) => {
                          if (err) {
                            done(err);
                            return;
                          }
                          res.body.should.deep.equal(values.modified);
                        });
    setTimeout(done(), 1000);
  });
});

// update status for type invite
describe('/update data in database', () => {
  it('should modify invite status in database values are given', (done) => {
    request(app)
                        .patch('/api/v1/memberrequests/GE/vimala@gmail.com')
                        .send(values.checkinvitetype)
                        .end((err, res) => {
                          if (err) {
                            done(err);
                            return;
                          }
                          res.body.should.deep.equal(values.modified);
                        });

    setTimeout(done(), 1000);
  });
});

// delete

describe('/delete data in database', () => {
  it('should delete domain from the database', (done) => {
    request(app)
                        .delete('/api/v1/memberrequests/tvs/jasmine@gmail.com')
                        .send(values.deletedomain)
                        .end((err, res) => {
                          if (err) {
                            done(err);
                            return;
                          }
                          res.body.should.deep.equal(values.deleted);
                        });

    setTimeout(done(), 1000);
  });
});


// get values for particular domain

describe('/get data from database', () => {
  it('should get domain from the database', (done) => {
    request(app)
                        .get('/api/v1/memberrequests/Infosys')
                        .end((err, res) => {
                          if (err) {
                            done(err);
                            return;
                          }
                          service.gettingValuesByDomain((error, result) => {
                            if (error) {
                              done(error);
                              return;
                            }

                            if (result) { res.body.should.deep.equal(result.rows); }
                          });
                        });
    setTimeout(done(), 1000);
  });
});
