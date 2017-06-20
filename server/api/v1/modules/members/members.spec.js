require('chai').should();

const app = require('../../../../app');

const request = require('supertest');

const membersService = require('./members.service');

const testData = require('./members.testData');

// get community member
describe('/get member detail from database for specified community', () => {
  it('should get member detail for specified community', (done) => {
    request(app)
            .get('/api/v1/members/member/Aravindh/communities')
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              membersService.getParticularMemberDetailInCommunities((error, result) => {
                if (error) {
                  console.log('Got error.......');
                  done(error);
                  return;
                } if (result) {
                  console.log('Got data.......');
                  res.body.should.deep.equal(result.rows);
                }
              });
              return done();
            });
  });

    // domain is empty
  it('should give error on post data in database as domain is empty', (done) => {
    request(app)
            .post('/api/v1/members/member/community/role')
            .send(testData.noDomainValue)
            .end((err, res) => {
              if (err) {
                return done(err);
              } if (res) {
                return res.body.should.deep.equal(testData.wrongData);
              }
              return done();
            });
  });

    // username is empty
  it('should give error on post data in database as username property is empty', (done) => {
    request(app)
            .post('/api/v1/members/member/community/role')
            .send(testData.noUsernameValue)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.wrongData);
            });
    return done();
  });

     // Role is empty
  it('should give error on post data in database as role property is empty', (done) => {
    request(app)
            .post('/api/v1/members/member/community/role')
            .send(testData.noRoleValue)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.wrongData);
            });
  });

      // All values are empty
  it('should give error on post data in database as all values are empty', (done) => {
    request(app)
            .post('/api/v1/members/member/community/role')
            .send(testData.noRoleValue)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.wrongData);
            });
  });

    // post data in database
  it('should post data 1 in database ', (done) => {
    request(app)
            .post('/api/v1/members/member/community/role')
            .send(testData.memberDetails1)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.memberDetails);
            });
  });

    // post data in database
  it('should post data 2 in  database ', (done) => {
    request(app)
           .post('/api/v1/members/member/community/role')
            .send(testData.memberDetails2)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.memberDetails);
            });
  });

      // post data in database
  it('should post data 3 in database ', (done) => {
    request(app)
            .post('/api/v1/members/member/community/role')
            .send(testData.memberDetails3)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.memberDetails);
            });
  });

   // patch data in database
  it('should update role of a member for a community in database, update community', (done) => {
    request(app)
            .patch('/api/v1/members/community/Wipro/role/member/Aravindh')
            .send(testData.updateRoles1)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.modified);
            });
    return done();
  });

      // patch data in database
  it('should update role of a member1 for a community in database, update community', (done) => {
    request(app)
            .patch('/api/v1/members/community/Wipro/role/member/Keerthi')
            .send(testData.updateRoles2)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.modified);
            });
  });

        // patch data in database
  it('should update role of a member2 for a community in database, update community', (done) => {
    request(app)
            .patch('/api/v1/members/community/Wipro/role/member/Suresh')
            .send(testData.noRoleValueUpdate)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.wrongData);
            });
  });

   //  Delete a row from table
  it('should delete data in database for a given domain and username', (done) => {
    request(app)
            .delete('/api/v1/members/removemember/Suresh/community/Wipro')
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return res.body.should.deep.equal(testData.deleted);
            });
  });
});
