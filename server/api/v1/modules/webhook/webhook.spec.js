// require('chai').should();
// const app = require('../../../../app.js');
// const supertest = require('supertest');
// const request = supertest(app);

// const postdata = { toolid: 'codepan',
//    domain: 'digital',
//    username: 'renukanrj@gmail.com',
//    events: 
//     [ { toolid: 'codepan',
//         eventid: 'UPVOTE0',
//         description: 'used to learn coding',
//         metadata: 'coder',
//         name: 'UPVOTE',
//         communityactivityevent: 'tacos-2' },
//      { toolid: 'codepan',
//         eventid: 'UPVOTE0',
//         description: 'used to learn coding',
//         metadata: 'coder',
//         name: 'UPVOTE',
//       communityactivityevent: 'tacos-2' },
//       { toolid: 'codepan',
//         eventid: 'UPVOTE0',
//         description: 'used to learn coding',
//         metadata: 'coder',
//         name: 'UPVOTE',
//         communityactivityevent: 'tacos-2' } ] }
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJpbGx1bWluYXRpIiwidG9vbGlkIjoicmFzdGVyIiwiZXZlbnRzIjpbImV2aWQxIiwiZXZpZDIiXSwiaWF0IjoxNTAwNDc3MzI2fQ.eH5Nn2iIXLdiXGjncYABLkHG9rgQCmkqvKpnFqQLcn8';
// describe('token should be verified', function() {
//   it('publish the event', function(done) {
//     request
//       .post(`/api/v1/webhooks/${token}`)
//       .end(function(err, result) {
//         if (err) {
//           done(err);
//         }
//         console.log("posted data", postdata.events);
//         result.should.be.equal(postdata.events);
//         done();
//       });
//   })
// })
