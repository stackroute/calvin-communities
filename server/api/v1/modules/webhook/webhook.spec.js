require('chai').should();
const app = require('../../../../app.js');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const tokenCtrl = require('./webhook.controller');
const request = supertest(app);

const postdata = [{
  'domain': 'illuminati',
  'toolId': 'raster',
  'events': ['evid1', 'evid2'],
}];
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJpbGx1bWluYXRpIiwidG9vbGlkIjoicmFzdGVyIiwiZXZlbnRzIjpbImV2aWQxIiwiZXZpZDIiXSwiaWF0IjoxNTAwNDc3MzI2fQ.eH5Nn2iIXLdiXGjncYABLkHG9rgQCmkqvKpnFqQLcn8';
describe('token should be verified', function() {
  it('publish the event', function(done) {
    request
      .post(`/api/v1/webhooks/${token}`)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        tokenCtrl.publishEventToTopic((results) => {
          console.log("posted data", postdata[0].events);
          console.log(result.body);
          results.body.should.be.deep.equal(postdata[0].events);
        })
        done();
      });
  })
})
