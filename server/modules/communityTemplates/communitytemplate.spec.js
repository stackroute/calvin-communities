const chai = require('chai');

const should = chai.should();

const app = require('../../app');
const request = require('supertest');
const technical = require('./templates/technical');
const medical = require('./templates/medical');
const professional = require('./templates/professional');
const sports = require('./templates/sports');
const teachers = require('./templates/teachers');

describe('/templates', function() {
  it('it should retrieve specified template data for technical', function (done) {
    request(app)
      .get('/community/templates/technical')
      .end((err, res) => {
        if (err) { done(err); return; }
        res.body.should.deep.equal(technical);
        done();
      });
  });
  it('it should retrieve specified template data for medical', function (done) {
    request(app)
      .get('/community/templates/medical')
      .end((err, res) => {
        if (err) { done(err); return; }
        res.body.should.deep.equal(medical);
        done();
      });
  });
  it('it should retrieve specified template data for professional', function (done) {
    request(app)
      .get('/community/templates/professional')
      .end((err, res) => {
        if (err) { done(err); return; }
        res.body.should.deep.equal(professional);
        done();
      });
  });
  it('it should retrieve specified template data for sports', function (done) {
    request(app)
      .get('/community/templates/sports')
      .end((err, res) => {
        if (err) { done(err); return; }
        res.body.should.deep.equal(sports);
        done();
      });
  });
  it('it should retrieve specified template data for teachers', function (done) {
    request(app)
      .get('/community/templates/teachers')
      .end((err, res) => {
        if (err) { done(err); return; }
        res.body.should.deep.equal(teachers);
        done();
      });
  });
});
