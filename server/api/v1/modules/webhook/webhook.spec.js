require('chai').should();
const app = require('../../../../app.js');
const supertest = require('supertest');
const request = supertest(app);

const postdata = {
  'domain': 'communities',
  'toolId': 'github',
  'eventId': 'Create a new post',
};
describe('publish the event', function() {
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW5OYW1lIjoiZGlnaXRhbCIsInRvb2xJZCI6ImRpc2NvdXJzZSIsInVzZXJuYW1lIjoiY2VhbnN0YWNrZGV2QGdtYWwuY29tIn0.2lqcZGRuvJZqRVWLMoYijIbmEXMIkIkZ51BIAoxTpxY";
  it('token should be verified', function(done) {
    request
      .post(`/api/v1/webhooks/${token}`)
      .send(postdata)
      .end(function(err, result) {
        if (err) {
          done(err);
        }
        result.should.be.equal('verified token');
        done();
      });
  })
})