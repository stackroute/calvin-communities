const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const app = require('../../app');

const request = require('supertest');


describe('/tools ', () => {
  const tools = {
    domain: 'engineer',
    id: '2507',
    action: ["'broadcast'", "'write'"],
    events: ["'postmessage'"],
  };

  const updatetools = {
    action: 'actionname',
    events: 'eventname',
  };

  it('Test PATCH method for updating tools', (done) => {
    request(app)
      .patch('/api/tools/doctors/1234/')
      .send(updatetools)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });

  it('it should add values to the tool table', (done) => {
    request(app)
      .post('/api/tools/')
      .send(tools)
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });


  it('Test Delete method for deleting the column', (done) => {
    request(app)
      .delete('/api/tools/doctors/')
      .send()
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.be.equal(204);
        done();
      });
  });

  it('Test Delete method for deleting actions in tools', (done) => {
    request(app)
      .delete('/api/tools/action/doctors/1234/updatenew')
      .send()
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.be.equal(204);
        done();
      });
  });

  it('Test Delete method for deleting actions in tools', (done) => {
    request(app)
      .delete('/api/tools/event/doctors/1234/broadcastsecond')
      .send()
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.be.equal(204);
        done();
      });
  });
});
