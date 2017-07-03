const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const expect = chai.expect;
const app = require('../../../../app');

const request = require('supertest');

// const service = require('./communitytools.services');

const value = require('./test.dao');

const uri = '/api/v1/communitytools/';

const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


describe('Test cases for tools of a community', () => {
  before(() => {
        // runs before all tests in this block
    client.execute('insert into communitytools (domain, toolid, actions, activityevents) values(\'engineer.wipro.blr\', \'quora\', {\'broadcast\', \'write\'},{\'postmessage\'});');
    client.execute('insert into communitytools (domain, toolid, actions, activityevents) values(\'doctors.blr\', \'quora\', {\'broadcast\', \'write\'},{\'postmessage\'});');
  });


  it('should get data for specified domain', (done) => {
    request(app)
            .get(`${uri}engineer.wipro.blr/tools`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('tools').a('Array');
              done();
            });
  });

  it('should get data for specified domain when in upper case', (done) => {
    request(app)
            .get(`${uri}engineer.wIpRo.bLr/tools`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('tools').a('Array');
              done();
            });
  });

  it('should throw error if value is not found', (done) => {
    request(app)
            .get(`${uri}wipro.blr/tools`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .end((err, res) => {
              if (err) {
                    // console.log(res.body);
                return done();
              }
              res.body.should.deep.equal(value.notFound);
              return done();
            });
    return null;
  });

    // nothing given for domain, username or owner

  it('should give error on post data in database when no values are given', (done) => {
    request(app)
            .post(`${uri}wipro.blr/tools/`)
            .expect(500)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.catchError);
              done();
            });
    return null;
  });

    //     // username not passed

  it('should give error on post data in database when domain is not given', (done) => {
    request(app)
            .post(`${uri}wipro.blr/tools`)
            .send(value.wrongtools)
            .expect(404)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.nullValue);
              return done();
            });
    return null;
  });


    // username string empty
  it('should give error on post data in database when domain property is empty', (done) => {
    request(app)
            .post(`${uri}wipro.blr/tools`)
            .send(value.wrongtool)
            .expect(404)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.nullValue);
              return done();
            });
    return null;
  });

      // post data in database, all values given
  it('should post data in database for all columns ', (done) => {
    request(app)
            .post(`${uri}doctors.blr/tools`)
            .send(value.toolsAll)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.be.deep.equal(value.toolcreated);
              done();
            });
    return null;
  });

  it('should give not post if tool already exists', (done) => {
    request(app)
            .post(`${uri}doctors.blr/tools`)
            .send(value.toolsAll)
            .expect(404)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              res.body.should.deep.equal(value.nullValue);
              return done();
            });
    return null;
  });


   // patch data in database
  it('should patch data in database, update community', (done) => {
    request(app)
            .patch(`${uri}${value.patch.domain}/tools/${value.patch.tool}`)
            .send(value.updatetools)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.modified);
              done();
            });
    return null;
  });


    // patch data in database
  it('should show failure message when domain does not exist n database', (done) => {
    request(app)
            .patch(`${uri}${value.notExisting.domain}/tools/${value.patch.tool}`)
            .send(value.updatetools)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.errMsg);
              done();
            });
    return null;
  });

    // patch data in database
  it('should show failure message when tool does not exist n database', (done) => {
    request(app)
            .patch(`${uri}${value.patch.domain}/tools/${value.notExisting.tool}`)
            .send(value.updatetools)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.errMsg);
              done();
            });
    return null;
  });

/*   //  Delete an action from table
  it('should delete action for a given domain and tool name', (done) => {
    request(app)
            .delete(`${uri}${value.patch.domain}/tools/${value.patch.tool}/action/publish`)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.actionDeleted);
              done();
            });
    return null;
  });*/

    //  Delete a tool from table
  it('should delete data in database for a given domain and tool name', (done) => {
    request(app)
            .delete(`${uri}${value.patch.domain}/tools/${value.patch.tool}`)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.deleted);
              done();
            });
    return null;
  });

  it('should delete data in database for a given domain and tool name in upper case', (done) => {
    request(app)
            .delete(`${uri}${value.patchUpper.domain}/tools/${value.patchUpper.tool}`)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.deleted);
              done();
            });
    return null;
  });

    //  Delete a tool from table
  it('should not delete data if tool name or domain does not exist in database', (done) => {
    request(app)
            .delete(`${uri}${value.patch.domain}/tools/${value.patch.tool}`)
            .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              res.body.should.deep.equal(value.errMsg);
              done();
            });
    return null;
  });
  after('', () => {
    client.execute("DELETE FROM communitytools where domain='Engineer.wipro.blr';");
    client.execute("DELETE FROM communitytools where domain='manager.wipro.blr';");
    client.execute("DELETE FROM communitytools where domain='doctors.blr';");
  });
});
