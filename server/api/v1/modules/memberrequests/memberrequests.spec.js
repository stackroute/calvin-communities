const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const expect = chai.expect;
const app = require('../../../../app');

const request = require('supertest');

// const service = require('./memberrequests.service');

const values = require('./test.dao');

const uri = '/api/v1/memberrequests/';

const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


describe('Test cases for insert and update data when invite or request occured', () => {
  before(() => {
        // runs before all tests in this block
    client.execute('insert into communityinviterequests (domain,role, person, invitedBy, status,type) values(\'doctor.wipro.blr\',\'moderator\',\'mohan@gmail.com\',\'sandy\',\'invitesent\',\'invite\');');
    client.execute('insert into communityinviterequests (domain,role, person, invitedBy, status,type) values(\'doctor.wipro.blr\',\'\',\'parkavi@gmail.com\',\'\',\'requested\',\'request\');');
  });


/* ----------------------TEST CASE FOR GET METHOD-------------------------------------------*/

// get list of data for particular domain
  it('should get data for specified domain', (done) => {
    request(app)
            .get(`${uri}doctor.wipro.blr`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('requests').a('Array');
              done();
            });
  });

// get lists of data for particular domain when domain is given in uppercase
  it('should get data for specified domain when in upper case', (done) => {
    request(app)
            .get(`${uri}DoCTOR.wIpRo.bLr`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('requests').a('Array');
              done();
            });
  });

// throw error when domain is not in the table
  it('should throw error if domain is not found', (done) => {
    request(app)
            .get(`${uri}wipro.blr`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .end((err, res) => {
              if (err) {
                    // console.log(res.body);
                return done();
              }
              res.body.should.deep.equal(values.notFound);
              return done();
            });
    return null;
  });
/* ----------------------TEST CASE FOR POST METHOD-------------------------------------------*/

// throw error when person email is null

  it('should give error on post data in database when no email value is given', (done) => {
    request(app)
            .post(`${uri}art.wipro.blr`)
            .send(values.noemail)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongdata);
              done();
            });
    return null;
  });

// throw error when domain is null

  it('should give error on post data in database when domain is null are given', (done) => {
    request(app)
            .post(`${uri}null`)
            .expect(500)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.erroroperation);
              done();
            });
    return null;
  });

 // throw error when wrong value in status(eg: status : ytyutytu)

  it('should give error on post data in database when wrong status values are given', (done) => {
    request(app)
            .post(`${uri}art.wipro.blr`)
            .send(values.statuswrong)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongdata);
              done();
            });
    return null;
  });

  // throw error when member is there if type is request

  it('should give error on post data in database when member is there if request occured', (done) => {
    request(app)
            .post(`${uri}art.wipro.blr`)
            .send(values.member)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongdata);
              done();
            });
    return null;
  });

  // throw error when role is there if type is request

  it('should give error on post data in database when role is there if request occured', (done) => {
    request(app)
            .post(`${uri}art.wipro.blr`)
            .send(values.role)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongdata);
              done();
            });
    return null;
  });

  // throw error if member is empty for type invite

  it('should give error on post data in database member is empty when invite occured', (done) => {
    request(app)
            .post(`${uri}art.wipro.blr`)
            .send(values.invitemember)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongdata);
              done();
            });
    return null;
  });

  // throw error if role is empty for type invite

  it('should give error on post data in database role is empty when invite occured', (done) => {
    request(app)
            .post(`${uri}art.wipro.blr`)
            .send(values.inviterole)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongdata);
              done();
            });
    return null;
  });

  // value for type is wrongly given(eg: type:vfdvhjfdjvfdj)

  it('should give error on post data in database when wrong value for type is given', (done) => {
    request(app)
            .post(`${uri}art.wipro.blr`)
            .send(values.wrongtype)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.wrongdata);
              done();
            });
    return null;
  });

  // Insert date for type invite
  it('should insert data into the table when invite occured', (done) => {
    request(app)
            .post(`${uri}art.wipro.blr`)
            .send(values.data)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.rowcreated);
              done();
            });
    return null;
  });

   // Insert date for type request
  it('should insert data into the table when request occured', (done) => {
    request(app)
            .post(`${uri}art.wipro.blr`)
            .send(values.requestinput)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.rowcreated);
              done();
            });
    return null;
  });

/* ----------------------TEST CASE FOR UPDATE METHOD-------------------------------------------*/

 // error throw when status is accepted when the type is request

  it('should give error on update data in database when status is accepted while the type is request', (done) => {
    request(app)
            .patch(`${uri}doctor.wipro.blr/person/parkavi@gmail.com`)
            .send(values.checkrequesttype)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.notupdate);
              done();
            });
    return null;
  });

  // error throw when member is empty for type request

  it('should give error on update status in database when member is empty while the type is request', (done) => {
    request(app)
            .patch(`${uri}doctor.wipro.blr/person/parkavi@gmail.com`)
            .send(values.emptyapprover)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.notupdate);
              done();
            });
    return null;
  });

// error throw when role is empty for type request

  it('should give error on update status in database when role is empty while the type is request', (done) => {
    request(app)
            .patch(`${uri}doctor.wipro.blr/person/parkavi@gmail.com`)
            .send(values.emptyrole)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.notupdate);
              done();
            });
    return null;
  });
  // update status for request type
  it('update status in database when the type is request', (done) => {
    request(app)
            .patch(`${uri}doctor.wipro.blr/person/parkavi@gmail.com`)
            .send(values.valueforrequest)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.modified);
              done();
            });
    return null;
  });

   // update status for invite type
  it('update status in database when the type is invite', (done) => {
    request(app)
            .patch(`${uri}doctor.wipro.blr/person/mohan@gmail.com`)
            .send(values.checkinvitetype)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.modified);
              done();
            });
    return null;
  });

  // error will throw when domain given for update is not in table
  it('error will throw when domain given for update is not in table', (done) => {
    request(app)
            .patch(`${uri}huhfugfdgfd/person/palavi@gmail.com `)
            .send(values.checkinvitetype)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.notupdate);
              done();
            });
    return null;
  });

  /* -----------------------------TEST CASE FOR DELETE----------------------------------------*/
  // throw error when value for delete is not in table
  it('throw error when value for delete is not in table', (done) => {
    request(app)
            .delete(`${uri}huhfugfdgfd/person/yyyyyy@gmail.com `)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.notdeleted);
              done();
            });
    return null;
  });

  // value for delete the row when the invite rejected
  it('delete the domain and person from the table when it is rejected', (done) => {
    request(app)
            .delete(`${uri}doctor.wipro.blr/person/mohan@gmail.com`)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.deleted);
              done();
            });
    return null;
  });

    // value for delete the row when the request rejected
  it('delete the domain and person from the table when it is rejected', (done) => {
    request(app)
            .delete(`${uri}doctor.wipro.blr/person/parkavi@gmail.com`)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(values.deleted);
              done();
            });
    return null;
  });
});
