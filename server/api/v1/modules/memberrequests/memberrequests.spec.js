require('chai').should();
const app = require('../../../../app');
const request = require('supertest');
const values = require('./test.dao');
const service = require('./memberrequests.service');


/* ----------------------TEST CASE FOR POST METHOD-------------------------------------------*/

// throw error when person email is null
describe('/Trying to insert data into database,with no email data', () => {
  it('should give error on post data in database when no email values is given', (done) => {
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
describe('Trying to post data in database,with no domain data', () => {
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

describe('Trying to post data in database,with status value wrong', () => {
  it('should give error on post data in database when wrong status value is given', (done) => {
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

// throw error when member is there if type is request

describe('Trying to insert member when the type is request, ', () => {
  it('should give error on post data in database when member is there if type is request', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send(values.member)
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

// throw error if member is empty for type invite

describe('Trying to insert empty member when the type is invite, ', () => {
  it('should give error on post data in database when member is empty if type is invite', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send(values.invitemember)
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

// value for type is wrongly given

describe('Trying to insert wrong value for type, ', () => {
  it('should give error on post data in database when wrong value is given for type', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send(values.invitemember)
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


// Insert date for type invite
describe('/post data in database when invite occured', () => {
  it('post method for insert values into the database', (done) => {
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

// Insert date for type request
describe('/post data in database when request occured', () => {
  it('post method for insert values into the database', (done) => {
    request(app)
            .post('/api/v1/memberrequests/membership')
            .send(values.requestinput)
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

/* --------------------------------TEST CASE FOR UPDATE-------------------------------------*/

// error through when status is wrongly given
describe('Trying to update data when status value is wrongly given', () => {
  it('should give error on patch data in database as status values is wrongly given', (done) => {
    request(app)
                .patch('/api/v1/memberrequests/marian/amudha@gmail.com')
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

describe('/Trying to update data in database,when member is empty for type request', () => {
  it('should give error on patch data in database when member is empty', (done) => {
    request(app)
                        .patch('/api/v1/memberrequests/marian/amudha@gmail.com')
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
describe('/update status to be approved in database when the type is request', () => {
  it('should modify data in database when values are given', (done) => {
    request(app)
                        .patch('/api/v1/memberrequests/marian/amudha@gmail.com')
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

// update status to be accepted for type invite
describe('/update data in database when the type is invite', () => {
  it('should modify invite status in database values are given', (done) => {
    request(app)
                        .patch('/api/v1/memberrequests/Godrej/mandu@gmail.com')
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

// error will throw when domain given for update is not in table
describe('/Error will be thrown when invalid domain and person is given', () => {
  it('should modify invite status in database values are given', (done) => {
    request(app)
                        .patch('/api/v1/memberrequests/dsfnsdkj/fhdsfhds')
                        .send(values.checkinvitetype)
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


/* -----------------------------TEST CASE FOR DELETE----------------------------------------*/

// value for delete the row when the request or invite rejected

describe('/delete data in database', () => {
  it('should delete and person from the database', (done) => {
    request(app)
                        .delete('/api/v1/memberrequests/Godrej/palavi@gmail.com')
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

// error will throw when the invalid domain and person is given
describe('/Trying to delete the domain and person which is not in the table', () => {
  it('error will throw when invalid domain and person is given', (done) => {
    request(app)
                        .patch('/api/v1/memberrequests/dsfnsdkj/fhdsfhds')
                        .send(values.checkinvitetype)
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

/* ------------------------TEST CASE FOR GETTING VALUES FOR DOMAIN-----------------------------*/

// get values for particular domain

describe('/get data from database', () => {
  it('should get domain from the database', (done) => {
    request(app)
                        .get('/api/v1/memberrequests/Godrej')
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

// getting error  for invalid domain

describe('/Trying to get lists from the database based on invalid domain name', () => {
  it('should throw error when domain is not in the table', (done) => {
    request(app)
                        .get('/api/v1/memberrequests/sdsdccddc')
                        .end((err, res) => {
                          if (err) {
                            done(err);
                            return;
                          }
                          service.gettingValuesByDomain((error) => {
                            if (error) {
                              done(error);
                              return;
                            }

                            res.body.should.deep.equal(values.wrongdata);
                          });
                        });
    setTimeout(done(), 1000);
  });
});

