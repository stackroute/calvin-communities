/* eslint prefer-arrow-callback:0, func-names:0 */
require('chai').should();
const app = require('../../../../app');
const request = require('supertest');
const templates = require('./templates');
const templateCtrl = require('./communitytemplate.controller');

const apiVersion = '/api/v1';

// test case for list the templates

describe('Test GET request to API /communitytemplates/', function () {
  it('Fetch all templates', function (done) {
    request(app)
      .get(`${apiVersion}/communitytemplates`)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        res.body.should.deep.equal(templates);
        res.body.length.should.be.equal(templates.length);
        done();
      });
  });
  it('Fetch all purposes', function (done) {
    request(app)
      .get(`${apiVersion}/communitytemplates/allpurposes`)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getListOfPurposes((result) => {
          res.body.should.deep.equal(result);
          res.body.length.should.deep.equal(result.length);
        });
        done();
      });
  });

  it('Fetch templates by specifying existing purpose', function (done) {
    request(app)
      .get(`${apiVersion}/communitytemplates?purpose=purpose`)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getTemplatesOfPurpose((result) => {
          res.body.should.deep.equal(result);
          res.body.length.should.deep.equal(result.length);
        });
        done();
      });
  });
  it('Fetch templates by specifying templatenames', function (done) {
    request(app)
      .get(`${apiVersion}/communitytemplates/:templatename`)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getTemplateOfTemplateName((result) => {
          res.body.should.deep.equal(result);
          res.body.length.should.deep.equal(result.length);
        });
        done();
      });
  });
  it('Fetch templates by specifying non-existing purpose', function (done) {
    request(app)
      .get(`${apiVersion}/communitytemplates?purpose=travel`)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getTemplatesOfPurpose((result) => {
          res.body.should.deep.equal(result);
        });
        done();
      });
  });

  describe('Test purpose based filtering of templates, for case-sensitivity', function () {
    it('Fetch templates by specifying existing purpose in UPPER case', function (done) {
      request(app)
        .get(`${apiVersion}/communitytemplates/?purpose=MEDICAL`)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          templateCtrl.getTemplatesOfPurpose((result) => {
            res.body.should.deep.equal(result);
          });
          done();
        });
    });
    it('Fetch templates by specifying existing purpose in miXEd case', function (done) {
      request(app)
        .get(`${apiVersion}/communitytemplates?purpose=MediCAl`)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          templateCtrl.getTemplatesOfPurpose((result) => {
            res.body.should.deep.equal(result);
          });
          done();
        });
    });
    it('Fetch templates by specifying existing purpose in lower case', function (done) {
      request(app)
        .get(`${apiVersion}/communitytemplates?purpose=technical`)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          templateCtrl.getTemplatesOfPurpose((result) => {
            res.body.should.deep.equal(result);
          });
          done();
        });
    });
  });
});
