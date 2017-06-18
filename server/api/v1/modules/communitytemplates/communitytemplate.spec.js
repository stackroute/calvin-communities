require('chai').should();
const app = require('../../../../app');
const request = require('supertest');
const templateCtrl = require('./communitytemplate.controller');

// test case for list the templates
describe('Retrieve the list of templates', () => {
  it(' should retrieve the list of templates', (done) => {
    request(app)
      .get('/communitytemplates')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getListOfTemplates((result) => {
          res.body.should.deep.equal(result);
        });
        done();
      });
  });
});

// test case for the specific template data
describe('Retrieve the specified template data', () => {
  it(' should retrieve specified template data ', (done) => {
    request(app)
      .get('/communitytemplates/:purpose')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getSpecifiedTemplateData((result) => {
          res.body.should.deep.equal(result);
        });
        done();
      });
  });
});
