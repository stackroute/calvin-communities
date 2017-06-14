const chai = require('chai');

const should = chai.should();
const app = require('../../app');

const request = require('supertest');


describe('/invitation ', () => {
  const Inviting = {
    email: 'marie@gmail.com',
    type: 'invite',
    status: 'rejected',
    domainname: 'engine',
    approver: 'mohan',
  };
  const updatestatus = { status: 'sent' };

  it('Test PUT method for updating status', (done) => {
    request(app)
      .put('/api/invitation/action/daf6757f06284cb6bd200e1b0828b31b')
      .send(updatestatus)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });

  it('it should insert a invite email in invite table', (done) => {
    request(app)
      .post('/api/invitation/send')
      .send(Inviting)
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });


it('Test Delete method for rejecting', (done) => {
    request(app)
      .delete('/api/invitation/delete/921604397d134c7184cbcaef3299e549')
      .send()
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
});
