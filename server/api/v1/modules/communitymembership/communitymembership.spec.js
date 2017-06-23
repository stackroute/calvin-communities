//require('chai').should();

const app = require('../../../../app');
const request = require('supertest');
const communityMembershipService = require('./communitymembership.service');
const testData = require('./communitymembership.testData');

// get community member
describe('/get member detail from database for specified community', () => {
    it('should get member detail for specified community', (done) => {
        request(app)
            .get('/api/v1/membership/community/Wipro/members')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                communityMembershipService.getParticularCommunityMemberDetails((error, result) => {
                    if (error) {
                        // console.log('Got error.......');
                        done(error);
                        return;
                    }
                    if (result) {
                        // console.log('Got data.......');
                        res.body.should.deep.equal(result.rows);
                    }
                });
                return done();
            });
    });


    // domain is empty
    it('should give error on post data in database as domain is empty', (done) => {
        request(app)
            .post('/api/v1/membership/community/member/role')
            .send(testData.noDomainValue)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.wrongData);
            });
        return done();
    });


    // username is empty
    it('should give error on post data in database as username property is empty', (done) => {
        request(app)
            .post('/api/v1/membership/community/member/role')
            .send(testData.noUsernameValue)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.wrongData);
            });
        setTimeout(done(), 1000);
    });

    // Role is empty
    it('should give error on post data in database as role property is empty', (done) => {
        request(app)
            .post('/api/v1/membership/community/member/role')
            .send(testData.noRoleValue)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.wrongData);
            });
        return done();
    });

    // All values are empty
    it('should give error on post data in database as all values are empty', (done) => {
        request(app)
            .post('/api/v1/membership/community/member/role')
            .send(testData.noRoleValue)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.wrongData);
            });
        return done();
    });


    // post data in database
    it('should post data 1 in database ', (done) => {
        request(app)
            .post('/api/v1/membership/community/member/role')
            .send(testData.memberDetails1)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.memberDetails);
            });
        return done();
    });

    // post data in database
    it('should post data 2 in  database ', (done) => {
        request(app)
            .post('/api/v1/membership/community/member/role')
            .send(testData.memberDetails2)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.memberDetails);
            });
        return done();
    });

    // post data in database
    it('should post data 3 in database ', (done) => {
        request(app)
            .post('/api/v1/membership/community/member/role')
            .send(testData.memberDetails3)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.memberDetails);
            });
        return done();
    });


    // patch data in database
    it('should update role of a member for a community in database, update community', (done) => {
        request(app)
            .patch('/api/v1/membership/member/Aravindh/community/Wipro/role')
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
            .patch('/api/v1/membership/member/Keerthi/community/Wipro/role')
            .send(testData.updateRoles2)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.modified);
            });
        return done();
    });

    // patch data in database
    it('should update role of a member2 for a community in database, update community', (done) => {
        request(app)
            .patch('/api/v1/membership/member/Suresh/community/Wipro/role')
            .send(testData.noRoleValueUpdate)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.wrongData);
            });
        return done();
    });


    //  Delete a row from table
    it('should delete data in database for a given domain and username', (done) => {
        request(app)
            .delete('/api/v1/membership/community/Wipro/removemember/Suresh')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return res.body.should.deep.equal(testData.deleted);
            });
        return done();
    });
});
