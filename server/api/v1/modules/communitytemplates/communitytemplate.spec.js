/* eslint prefer-arrow-callback:0, func-names:0 */
require('chai').should();
const app = require('../../../../app');
const request = require('supertest');
const templates = require('./templates');

const apiVersion = '/api/v1';

// test case for list the templates

describe('Test GET request to API /communitytemplates/', function() {
  it('Fetch all templates', function(done) {
    request(app)
      .get(`${apiVersion}/communitytemplates`)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        res.body.should.deep.equal(templates);
        // res.body.length.should.be.equal(template.length);
        done();
      });
  });
  it('Fetch templates by specifying existing purpose', function(done) {
    done('no implemented');
  });

  describe('Test purpose based filtering of templates, for case-sensitivity', function() {
    it('Fetch templates by specifying existing purpose in UPPER case', function(done) {
      done('no implemented');
    });
    it('Fetch templates by specifying existing purpose in miXEd case', function(done) {
      done('no implemented');
    });
  });

  it('Fetch templates by specifying non-existing purpose', function(done) {
    done('no implemented');
  });
  it('Fetch templates by specifying query parameter, which is not in API', function(done) {
    done('no implemented');
  });
});
