// // const request = require('supertest');

// // const app = require('./addmember.controller');

// // describe('/member api', () => {
// //   it('it should add member to table', (done) => {
// //     request(app)
// //       .post('/member')
// //       .expect(201)
// //       .expect('Content-Type', /json/)
// //       .end((err, res) => {
// //         if (err) {
// //           done(err);
// //           return;
// //         }
// //         res.body.username.should.be.equal(app.addmember(params.username));
// //         res.body.domain.should.be.equal(app.addmember(params.domain));
// //         res.body.role.should.be.equal('member');
// //         done();
// //       });
// //   });
// // });

// // const chai = require('chai').should();

// // const should = chai.should();


// // const updatestatus = { status: 'sent' };

// // it('Test PUT method for updating status', (done) => {
// //   request(app)
// //     .put('/api/invitation/action/daf6757f06284cb6bd200e1b0828b31b')
// //     .send(updatestatus)
// //     .set('Accept', 'application/json')
// //     .end((err, res) => {
// //       res.status.should.be.equal(200);
// //       done();
// //     });
// // });

// const app = require('../../app');

// const request = require('supertest');


// describe('/member ', () => {
//   const adding = {
//     username: 'Aravindh',
//     domain: 'wipro',
//     role: 'member',
//   };

//   it('it should insert a member to a membership table', (done) => {
//     request(app)
//       .post('api/member')
//       .send(adding)
//       .end((err, res) => {
//         res.status.should.be.equal(201);
//         done();
//       });
//   });

//   it('Test Delete method for deleting', (done) => {
//     request(app)
//       .delete('api/member/:username')
//       .send()
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.be.equal(200);
//         done();
//       });
//   });
// });
