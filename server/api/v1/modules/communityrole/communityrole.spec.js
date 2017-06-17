const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const app = require('../../app');

const request = require('supertest');


describe(' CRUD Operations on api/communityrole ', () => {
  const postcommunityrole = {
    domain: 'mit',
    role: 'developer',
    actions: {
      clone: '1',
      commit: '1',
      createrepo: '1',
      merge: '1',
    },
    toolid: 'git',
  };

  const patchcommunityrole = {

    actions: {
      clone: '10',
      commit: '1',
      createrepo: '10',
      merge: '1',
    },
  };

  it('Test PATCH method for community role', (done) => {
    request(app)
      .patch('/api/communityrole/mit/developer')
      .send(patchcommunityrole)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });

  it('PATCH method must not return 404 error', (done) => {
    request(app)
      .patch('/api/communityrole/mit/developer')
      .send(patchcommunityrole)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.not.be.equal(304);
        done();
      });
  });

  it('it should add values to the communityrole table', (done) => {
    request(app)
      .post('/api/communityrole/')
      .send(postcommunityrole)
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });

  it('POST method must not return 404', (done) => {
    request(app)
      .post('/api/communityrole/')
      .send(postcommunityrole)
      .end((err, res) => {
        res.status.should.not.be.equal(404);
        done();
      });
  });
});
