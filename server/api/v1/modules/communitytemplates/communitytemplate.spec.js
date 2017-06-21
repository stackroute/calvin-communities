/* eslint prefer-arrow-callback:0, func-names:0 */
require('chai').should();
const app = require('../../../../app');
const request = require('supertest');
const templateCtrl = require('./communitytemplate.controller');

// test case for list the templates

describe('Retrieve the list of templates', function() {
  it(' should retrieve the list of templates', function(done) {
    request(app)
      .get('/api/v1/communitytemplates')
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
describe('Retrieve the specified template data based on purpose', function() {
  it(' should retrieve specified template data on purpose ', function(done) {
    request(app)
      .get('/api/v1/communitytemplates/purposes')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getTemplatesOnPurpose((result) => {
          res.body.should.deep.equal(result);
        });
        done();
      });
  });
});

// test case for the specific template data
describe('Retrieve the specified template data based on template name', function() {
  it(' should retrieve specified template data based on template name', function(done) {
    request(app)
      .get('/api/v1/communitytemplates/templatenames')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getTemplateOnTemplateName((result) => {
          res.body.should.deep.equal(result);
        });
        done();
      });
  });
});
