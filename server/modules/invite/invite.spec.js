require('chai').should();

const app = require('../../app');

const request = require('supertest');


describe('/invitation ', () => {
  const Inviting = {
    email: 'marie@gmail.com',
    type: 'invite',
    status: 'invitesent',
    domain: 'engine',
    approver: 'mohan',
  };
  const updatestatus = { status: 'accepted' };

  it('Test PATCH method for updating status', (done) => {
    request(app)
      .patch('/api/membership/action/645545ba35be4d2db8039867f908837a')
      .send(updatestatus)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.be.equal(202);
        done();
      });
  });

  it('it should insert a invite email in invite table', (done) => {
    request(app)
      .post('/api/membership/send')
      .send(Inviting)
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });


  it('Test Delete method for rejecting', (done) => {
    request(app)
      .delete('/api/membership/rejected/61f3fbebfed846319e69e9d7fbe88f47')
      .send()
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
});
