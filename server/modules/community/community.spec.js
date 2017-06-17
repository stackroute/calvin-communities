require('chai').should();

const app = require('../../app');

const request = require('supertest');

const values = require('./testdata');

const arrayoutput = values.getdomain;

const service = require('./community.service');


// get data for all communities
describe('/get data from database for all communities', () => {
    it('should get data for all communities', (done) => {
        request(app)
            .get('/api/community/')
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                service.getallcommunities()
                    .then((result) => { res.body.should.deep.equal(result.rows); })
                    .catch((error) => { error; });

                done();
            });
    });
});


// get data for particular domain
describe('/get data from database with :domain', () => {
    it('should get data for domain specified', (done) => {
        request(app)
            .get(`/api/community/${values.getdomain.domain}`)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal([arrayoutput]);
                done();
            });
    });
});

// nothing given for domain, username or owner
describe('/post data in database, no data given', () => {
    it('should give error on post data in database as no values are given', (done) => {
        request(app)
            .post('/api/community')
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.wrongdata);
                done();
            });
    });
});

// username not passed
describe('/post data in database, empty string passed for username', () => {
    it('should give error on post data in database as name is not given', (done) => {
        request(app)
            .post('/api/community')
            .send(values.noname)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.wrongdata);
                done();
            });
    });
});

// username string empty
describe('/post data in database, give error as empty string is passed for property', () => {
    it('should give error on post data in database as name property is empty', (done) => {
        request(app)
            .post('/api/community')
            .send(values.emptyname)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.wrongdata);
                done();
            });
    });
});


// post data in database, only necessary columns
describe('/post data in database, only necessary columns given', () => {
    it('should post data in database for columns given', (done) => {
        request(app)
            .post('/api/community')
            .send(values.data)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.rowcreated);
                done();
            });
    });
});

// post data in database, all values given
describe('/post data in database, all  columns given', () => {
    it('should post data in database for all columns ', (done) => {
        request(app)
            .post('/api/community')
            .send(values.completepost)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.be.deep.equal(values.rowcreated);
            });
        done();
    });
});


// post data in database, empty tags given
describe('/post data in database, error to show for giving empty tags', () => {
    it('should not post data in database as tags are empty', (done) => {
        request(app)
            .post('/api/community')
            .send(values.notags)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.wrongdata);
                done();
            });
    });
});

// patch data in database
describe('/patch data in database, update community details', () => {
    it('should patch data in database, update community', (done) => {
        request(app)
            .patch(`/api/community/${values.patchcorrect.domain}`)
            .send(values.patchcorrect)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.updatemsg);
                done();
            });
    });
});

// patch data in database, no updater details, ERROR
describe('/patch data in database, no updater details, ERROR', () => {
    it('should not patch data in database, no updater details, ERROR', (done) => {
        request(app)
            .patch(`/api/community/${values.patchcorrect.domain}`)
            .send(values.patchnoowner)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.wrongdata);
                done();
            });
    });
});

// patch data in database, no tags given, ERROR
describe('/patch data in database, no tag details, ERROR', () => {
    it('should not patch data in database, no tag details, ERROR', (done) => {
        request(app)
            .patch(`/api/community/${values.patchcorrect.domain}`)
            .send(values.patchnotags)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.wrongdata);
                done();
            });
    });
});
