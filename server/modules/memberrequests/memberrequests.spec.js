require('chai').should();

const app = require('../../app');

const request = require('supertest');
const values = require('./test.dao');
const service = require('./memberrequests.service');


  // email is null
describe('/post data in database, no email data', () => {
  it('should give error on post data in database as no email values is given', (done) => {
    request(app)
    .post('/api/membership/send')
    .send(values.noemail)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});

// domain is null
describe('/post data in database, no domain data', () => {
  it('should give error on post data in database as no domain values is given', (done) => {
    request(app)
    .post('/api/membership/send')
    .send(values.nodomainname)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});

// wrong value in status

describe('/post data in database, no data given', () => {
  it('should give error on post data in database as no domain values is given', (done) => {
    request(app)
    .post('/api/membership/send')
    .send(values.statuswrong)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});

// created
describe('/post data in database', () => {
  it('post method for insert values into the data', (done) => {
    request(app)
    .post('/api/membership/send')
    .send(values.data)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.rowcreated);
      done();
    });
  });
});


// gettingdata
describe('/get data from database', () => {
  it('should get data', (done) => {
    request(app)
    .get('/api/membership/lists')
    .end((errors, res) => {
      service.getMember((er, results) => {
        if (er) { done(errors); return; }
        if ((results) => { res.body.should.deep.equal(results.rows); }) { done(); }
    });
  });
});


// get data for particular id
describe('/get data from database with :id', () => {
  it('should get data for id specified', (done) => {
    request(app)
    .get(`/api/membership/${values.getvalues.id}`)
    .end((err, res) => {
      if (err) { done(err); return; }
      if ((result) => { res.body.should.deep.equal(result.rows); }) { done(); }
    });
  });
});

//updated
describe('/update data in database, no data given', () => {
  it('should give error on patch data in database as no status values is given', (done) => {
    request(app)
    .post('/api/membership/action')
    .send(values.checkrequesttype)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});

describe('/update data in database, no data given', () => {
  it('should give error on patch data in database as no status values is given', (done) => {
    request(app)
    .post('/api/membership/action')
    .send(values.emptyapprover)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});

describe('/update data in database, no data given', () => {
  it('should give error on patch data in database as no status values is given', (done) => {
    request(app)
    .post('/api/membership/action')
    .send(values.valueforrequest)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});

describe('/update data in database, no data given', () => {
  it('should give error on patch data in database as no status values is given', (done) => {
    request(app)
    .post('/api/membership/action')
    .send(values.checkinvitetype)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});


//   it('Test Delete method for rejecting', (done) => {
//     request(app)
//       .delete('/api/membership/rejected/61f3fbebfed846319e69e9d7fbe88f47')
//       .send()
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.be.equal(200);
//         done();
//       });
//   });

