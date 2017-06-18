require('chai').should();
const app = require('../../../../app');
const request = require('supertest');
const templateCtrl = require('./communitytemplate.controller');

describe('Retrieve the list of templates', function () {
  it(' should retrieve the list of templates', function (done) {
    request(app)
    .get('/communitytemplates')
    .end((err, res) => {
      if (err) {
        done(err);
        return;
      }
      templateCtrl.getListOfTemplates((err, result) => {
        if (err) {
          done(err);
          return;
        } { res.body.should.deep.equal(result); }
      });
      done();
    });
  });
});

describe('Retrieve the specified template data', function () {
  it(' should retrieve specified template data ', function (done) {
    request(app)
      .get('/communitytemplates')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getSpecifiedTemplateData((err, result) => {
          if (err) {
            done(err);
            return;
          } { res.body.should.deep.equal(result); }
        });
        done();
      });
  });
});
