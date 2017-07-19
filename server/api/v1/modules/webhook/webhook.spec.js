require('chai').should();
const app = require('../../../../app.js');
const supertest = require('supertest');
const request = supertest(app);

const postdata = {
  'domain': 'communities',
  'toolId': 'github',
  'eventId': 'Create a new post',
};
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJzb3Ntd2Vkc29td2Rzc3Nzc2Rhc2luIiwidG9vbGlkIjoic29tZGVpZGRkczEiLCJldmVudHMiOlsiZXZpZCIsImV2aWQyIl0sImlhdCI6MTUwMDQ2NTY4Nn0.Vcx1Tcd-I4wTG1zyYxuApFQJesjn5Wb5KKGygztg3Zk';
describe('publish the event', function() {
  it('token should be verified', function(done) {
    request
      .post(`/api/v1/webhooks/${token}`)
      .end(function(err, result) {
        if (err) {
          done(err);
        }
        result.should.be.equal(postdata);
        done();
      });
  })
})