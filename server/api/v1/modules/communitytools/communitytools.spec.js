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
    client.execute(`insert into communitytools \
      (domain, toolid, actions, avatar, toolurl, createdon,purpose,toolname) \
      values('engineer.wipro.blr', 'quora', {'broadcast', 'write'},'http://images.wisegeek.com/cameraman.jpg', \
       'quora.inc', dateof(now()),'for medical purpose', 'quoratool');`);
    client.execute(`insert into communitytools \
      (domain, toolid, actions, avatar, toolurl, createdon,purpose,toolname) \
      values('doctors.blr', 'quora', {'broadcast', 'write'},'http://images.wisegeek.com/cameraman.jpg', \
       'quora.inc', dateof(now()),'for medical purpose', 'quoratool');`);
  });


  it('should throw error if value is not found', (done) => {
    request(app)
      .get(`${uri}doctors.blr/`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from communitytools where domain=\'wipro.blr\'', (err, result) => {
            if (!err) {
              // console.log('Result from testcase', result.rows.length);
              result.rows.length.should.deep.equal(0);
              return done();
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });

  // nothing given for domain, username or owner

  it('should give error on post data in database when no values are given', (done) => {
    request(app)
      .post(`${uri}domains.wipro.blr/tools/sermos`)
      .expect(400)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from communitytools where domain=\'domains.wipro.blr\' and toolid = \'sermos\'', (err, result) => {
            if (!err) {
              console.log('Result from testcase', result.rows.length);
              result.rows.length.should.deep.equal(0);
              results.body.should.deep.equal("Required Data Not Provided");
              return done();
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });

  //     // username not passed

  it('should give error on post data in database when tool is not given', (done) => {
    request(app)
      .post(`${uri}wipro.blr/tools/quora`)
      .send(value.wrongtools)
      .expect(400)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from communitytools where domain=\'wipro.blr\'', (err, result) => {
            if (!err) {
              // console.log('Result from testcase', result.rows.length);
              result.rows.length.should.deep.equal(0);
              results.body.should.deep.equal("Required Data Not Provided");
              return done();
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });


  // username string empty
  it('should give error on post data in database when tool property is empty', (done) => {
    request(app)
      .post(`${uri}wipro.blr/tools/wemedup`)
      .send(value.wrongtool)
      .expect(400)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from communitytools where domain=\'wipro.blr\'', (err, result) => {
            if (!err) {
              // console.log('Result from testcase', result.rows.length);
              result.rows.length.should.deep.equal(0);
              results.body.should.deep.equal("Required Data Not Provided");
              return done();
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });

  // post data in database, all values given
  it('should post data in database ', (done) => {
    request(app)
      .post(`${uri}singer.blr/tools/sermo`)
      .send(value.toolsAll)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from communitytools where domain=\'singer.blr\' and toolid = \'sermo\'', (err, result) => {
            if (!err) {
              console.log(result.rows);
              console.log
              result.rows.length.should.deep.equal(1);
              result.rows[0].domain.should.deep.equal("singer.blr");
              result.rows[0].toolid.should.deep.equal("sermo");
              result.rows[0].actions.should.deep.equal(value.toolsAll.actions);
              return done();
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });

  it('should not post if tool already exists', (done) => {
    request(app)
      .post(`${uri}singer.blr/tools`)
      .send(value.toolsAll)
      .expect(404)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from communitytools where domain=\'singer.blr\'', (err, result) => {
            if (!err) {
              // console.log('Result from testcase', result.rows.length);
              result.rows.length.should.deep.equal(1);
              results.body.should.deep.equal({ "error": "Resource not found" });
              return done();
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });

  it('should get data for specified domain and tool', (done) => {
    request(app)
      .get(`${uri}singer.blr/tools/sermo`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from communitytools where domain=\'singer.blr\' and toolid = \'sermo\'', (err, result) => {
            if (!err) {
              console.log(result.rows[0].domain);
              console.log(results.body);
              result.rows.length.should.deep.equal(1);
              result.rows[0].domain.should.deep.equal('singer.blr');
              expect(results.body).to.have.property('domain').a('string');
              expect(results.body).to.have.property('toolid').a('string');
              expect(results.body).to.have.property('events').a('Array');
              return done();
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });


  it('should get data for specified domain', (done) => {
    request(app)
      .get(`${uri}singer.blr/`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from communitytools where domain=\'singer.blr\'', (err, result) => {
            if (!err) {
              console.log(results.body);
              console.log(result.rows);
              result.rows.length.should.deep.equal(1);
              result.rows[0].actions.should.deep.equal(results.body.tools[0].actions);
              expect(results.body).to.have.property('domain').a('string');
              expect(results.body).to.have.property('tools').a('Array');
              return done(null, results);
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });



  // patch data in database
  it('should patch data in database, update community', (done) => {
    request(app)
      .patch(`${uri}${value.patch.domain}/tools/${value.patch.tool}`)
      .send(value.updatetools)
      .end((error, results) => {
        if (!error) {
          client.execute('SELECT * from communitytools where domain=\'engineer.wipro.blr\' and toolid = \'quora\'', (err, result) => {
            if (!err) {
              // console.log('Result from testcase', result.rows.length);
              result.rows.length.should.deep.equal(1);
              result.rows[0].domain.should.deep.equal('engineer.wipro.blr');
              return done();
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });


  // patch data in database
  it('should show failure message when domain does not exist n database', (done) => {
    request(app)
      .patch(`${uri}dummyvalssa/tools/${value.patch.tool}`)
      .send(value.updatetools)
      .end((error, results) => {
        if (!error) {
          client.execute(`SELECT * from communitytools where domain='dummyvalssa' and toolid = '${value.patch.tool}'`, (err, result) => {
            if (!err) {
              console.log('Result from testcase', result.rows);
              result.rows.length.should.deep.equal(0);
              return done();
            } else {
              return done(err);
            }
          });
        } else {
          return done(error);
        }
      });
    return null;
  });
 
     // patch data in database
     it('should show failure message when tool does not exist n database', (done) => {
       request(app)
         .patch(`${uri}${value.patch.domain}/tools/${value.notExisting.tool}`)
         .send(value.updatetools)
         .end((error, results) => {
           if (!error) {
             client.execute(`SELECT * from communitytools where domain='${value.patch.domain}' and toolid = '${value.notExisting.tool}'`, (err, result) => {
               if (!err) {
                 // console.log('Result from testcase', result.rows.length);
                 result.rows.length.should.deep.equal(0);
                 return done();
               }
               return null;
             });
           } else if (!results) {
             return done(error);
           }
           return null;
         });
       return null;
     });
 /*
     //  Delete an action from table
     it('should delete action for a given domain and tool name', (done) => {
       request(app)
         .delete(`${uri}${value.patch.domain}/tools/${value.patch.tool}/action/publish`)
         .end((err, res) => {
           if (err) {
             done(err);
             return;
           }
           // console.log(res.body);
           res.body.should.deep.equal(value.actionDeleted);
           done();
         });
       return null;
     });


     //  Delete a tool from table
     it('should delete data in database for a given domain and tool name', (done) => {
       request(app)
         .delete(`${uri}${value.patch.domain}/tools/${value.patch.tool}`)
         .end((error, results) => {
           if (!error) {
             client.execute('SELECT * from communitytools where domain=\'engineer.wipro.blr\' and toolid = \'quora\'', (err, result) => {
               if (!err) {
                 // console.log('Result from testcase', result.rows.length);
                 result.rows.length.should.deep.equal(0);
                 return done();
               }
               return null;
             });
           } else if (!results) {
             return done(error);
           }
           return null;
         });
       return null;
     });

     it('should delete data in database for a given domain and tool name in upper case', (done) => {
       request(app)
         .delete(`${uri}${value.patchUpper.domain}/tools/${value.patchUpper.tool}`)
         .end((error, results) => {
           if (!error) {
             client.execute('SELECT * from communitytools where domain=\'engineer.wipro.blr\' and toolid = \'quora\'', (err, result) => {
               if (!err) {
                 // console.log('Result from testcase', result.rows.length);
                 result.rows.length.should.deep.equal(0);
                 return done();
               }
               return null;
             });
           } else if (!results) {
             return done(error);
           }
           return null;
         });
       return null;
     });

     //  Delete a tool from table
     it('should not delete data if tool name or domain does not exist in database', (done) => {
       request(app)
         .delete(`${uri}${value.patch.domain}/tools/${value.patch.tool}`)
         .end((error, results) => {
           if (!error) {
             client.execute('SELECT * from communitytools where domain=\'engineer.wipro.blr\' and toolid = \'quora\'', (err, result) => {
               if (!err) {
                 // console.log('Result from testcase', result.rows.length);
                 result.rows.length.should.deep.equal(0);
                 return done();
               }
               return null;
             });
           } else if (!results) {
             return done(error);
           }
           return null;
         });

       return null;
     });

     it('should post data in database for multiple values', (done) => {
       request(app)
         .post(`${uri}dancer.blr/tools`)
         .send(value.multipleTools)
         .end((error, results) => {
           if (!error) {
             client.execute('SELECT * from communitytools where domain=\'dancer.blr\'', (err, result) => {
               if (!err) {
                 result.rows.length.should.deep.equal(3);
                 result.rows[0].domain.should.deep.equal(results.body[0].domain);
                 result.rows[1].toolid.should.deep.equal(results.body[0].tools[1].toolid);
                 result.rows[2].actions.should.deep.equal(results.body[0].tools[2].actions);
                 result.rows[0].activityevents.should.deep.equal(results
                   .body[0].tools[0].activityevents);
                 return done();
               }
               return null;
             });
           } else if (!results) {
             return done(error);
           }
           return null;
         });
       return null;
     });

     it('should not post data in database for multple values when a single array is wrong', (done) => {
       request(app)
         .post(`${uri}dancerss.blr/tools`)
         .send(value.multipleWrongTools)
         .end((error, results) => {
           if (!error) {
             client.execute('SELECT * from communitytools where domain=\'dancerss.blr\'', (err, result) => {
               if (!err) {
                 result.rows.length.should.deep.equal(0);
                 results.body.should.deep.equal(value.novalue);
                 return done();
               }
               return null;
             });
           } else if (!results) {
             return done(error);
           }
           return null;
         });
       return null;
     });*/

  after('', () => {
    client.execute("DELETE FROM communitytools where domain='engineer.wipro.blr';");
    client.execute("DELETE FROM communitytools where domain='wipro.blr';");
    client.execute("DELETE FROM communitytools where domain='manager.wipro.blr';");
    client.execute("DELETE FROM communitytools where domain='doctors.blr';");
    client.execute("DELETE FROM communitytools where domain='singer.blr';");
    client.execute("DELETE FROM communitytools where domain='sandhya.community';");
    client.execute("DELETE FROM communitytools where domain='dancer.blr';");
  });
});
