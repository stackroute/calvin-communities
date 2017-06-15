require('chai').should();

const app = require('../../app');

const request = require('supertest');

const values = require('./testdata');

const arrayoutput = values.getdomain;

describe('/gettingAllCommunities', () => {
  it('should show me all communities in database', (done) => {
    request(app)
    .get('/api/community')
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.dataatthemoment);
      done();
    });
  });
});

// nothing given for domain, username or owner
describe('/post data in database, no data given', () => {
  it('should give error on post data in database as no values are given', (done) => {
    request(app)
    .post('/api/community')
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});

// username not passed
describe('/post data in database, empty string passed for username', () => {
  it('should give error on post data in database as name is not given', (done) => {
    request(app)
    .post('/api/community')
    .send(values.noname)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});

// username string empty
describe('/post data in database', () => {
  it('should give error on post data in database as name property is empty', (done) => {
    request(app)
    .post('/api/community')
    .send(values.emptyname)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.wrongdata);
      done();
    });
  });
});

// get data for particular domain
describe('/get data from database with :domain', () => {
  it('should get data for domain specified', (done) => {
    request(app)
    .get(`/api/community/${values.getdomain.domain}`)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal([arrayoutput]);
      done();
    });
  });
});

// post correct data in database
describe('/post data in database', () => {
  it('should post data in database', (done) => {
    request(app)
    .post('/api/community')
    .send(values.data)
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(values.rowcreated);
      done();
    });
  });
});
