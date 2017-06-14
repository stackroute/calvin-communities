const chai = require('chai');
const should = chai.should();

const app = require('../../app');
const request = require('supertest');

  it('it should create a new cartoon', function(done) {
    request(app)
      .post('/cartoons')
      .send(cartoonToCreate)
      .expect(201)
      .end((err, res) => {
        if(err) { done(err); return; }
        res.status.should.be.equal(200);
        done();
      });
  });

  it('it should create a new cartoon', function(done) {
    request(app)
      .post('/cartoons')
      .send(cartoonToCreate)
      .expect(201)
      .end((err, res) => {
        if(err) { done(err); return; }
        res.body.name.should.be.equal(cartoonToCreate.name);
        res.body.author.should.be.equal(cartoonToCreate.author);
        res.body.id.should.be.equal(1);
        done();
      });
  });

  it('it should retrieve list of cartoons', function(done) {
    request(app)
      .get('/cartoons')
      .end((err, res) => {
        if(err) { done(err); return; }
        res.body.should.have.lengthOf(2);
        done();
      });
  });

  it('it should retrieve cartoon by id', function(done) {
    request(app)
      .get('/cartoons/0')
      .end((err, res) => {
        if(err) { done(err); return; }
        console.log('body:', res.body);
        res.body.name.should.be.equal(cartoonToCreate.name);
        res.body.author.should.be.equal(cartoonToCreate.author);
        done();
      });
  });
});