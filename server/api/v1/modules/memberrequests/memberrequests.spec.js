require('chai').should();

const app = require('../../../../app');

const request = require('supertest');
const values = require('./test.dao');
const service = require('./memberrequests.service');



// person email is null
describe('/post data in database, no email data', () =>     {
    it('should give error on post data in database as no email values is given', (done) => {
        request(app)
            .post('api/v1/memberrequests/membership')
            .send(values.noemail)
            .end((err, res) => {
                if (err) { done(err);
                    return; }       
                res.body.should.deep.equal(values.wrongdata);
               
            });
        done();
    });
});

// domain is null
describe('/post data in database, no domain data', () => {
    it('should give error on post data in database as no domain values is given', (done) => {
        request(app)
            .post('api/v1/memberrequests/membership')
            .send(values.nodomainname)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.wrongdata);
               
            });
        done();
    });
});

// wrong value in status

describe('/post data in database, no data given', () => {
    it('should give error on post data in database as no domain values is given', (done) => {
        request(app)
            .post('api/v1/memberrequests/membership')
            .send(values.statuswrong)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.wrongdata);
                });
            done();
        });
});

// created
describe('/post data in database', () => {
    it('post method for insert values into the data', (done) => {
        request(app)
            .post('api/v1/memberrequests/membership')
            .send(values.data)
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                res.body.should.deep.equal(values.rowcreated);
               
            });
        done();
    });
});


//updated
    describe('/update data in database, no data given', () => {
        it('should give error on patch data in database as status values is wrongly given', (done) => {
            request(app)
                .patch('api/v1/memberrequests/${values.domain}/${values.person}')
                .send(values.checkrequesttype)
                .end((err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                res.body.should.deep.equal(values.wrongdata);
                    
                });
                done();
            });
        });

            describe('/update data in database, no data given', () => {
                it('should give error on patch data in database when member is empty', (done) => {
                    request(app)
                        .patch('api/v1/memberrequests/${values.domain}/${values.person}')
                        .send(values.emptyapprover)
                        .end((err, res) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            res.body.should.deep.equal(values.wrongdata);
                            
                        });
                    done();
                });
            });

            describe('/update data in database', () => {
                it('should modify data in database when values are given', (done) => {
                    request(app)
                        .patch('api/v1/memberrequests/${values.domain}/${values.person}')
                        .send(values.valueforrequest)
                        .end((err, res) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            res.body.should.deep.equal(values.modified);
                            
                        });
                    done();
                });
            });

            describe('/update data in database', () => {
                it('should modify invite status in database values are given', (done) => {
                    request(app)
                        .patch('api/v1/memberrequests/${values.domain}/${values.person}')
                        .send(values.checkinvitetype)
                        .end((err, res) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            res.body.should.deep.equal(values.modified);
                            
                        });

                    done();
                });
            });

//delete 

describe('/delete data in database', () => {
                it('should delete domain from the database', (done) => {
                    request(app)
                        .patch('api/v1/memberrequests/${values.domain}')
                        .send(values.deletedomain)
                        .end((err, res) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            res.body.should.deep.equal(values.deleted);
                            
                        });

                    done();
                });
            });

       