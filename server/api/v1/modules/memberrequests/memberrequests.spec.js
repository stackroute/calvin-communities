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
    client.execute('insert into communitymembership(domain,username,role) values(\'seconddomain\',\'raja@gmail.com\',\'admin\');');
    client.execute('insert into communityroles(domain,role,toolid,actions) values(\'firstdomain\',\'admin\',\'forum\',{\'edit\':\'self\'});');
    client.execute('insert into communityroles(domain,role,toolid,actions) values(\'seconddomain\',\'admin\',\'forum\',{\'edit\':\'self\'});');
    client.execute('delete from communityinviterequests where domain = \'doctor.wipro.blr\'');
    client.execute('insert into communityinviterequests (domain,role, person, invitedBy, status,type) values(\'doctor.wipro.blr\',\'moderator\',\'mohan@gmail.com\',\'sandy\',\'invitesent\',\'invite\');');
    client.execute('insert into communityinviterequests (domain,role, person, invitedBy, status,type) values(\'doctor.wipro.blr\',\'admin\',\'mano@gmail.com\',\'sandy\',\'invitesent\',\'invite\');');
    client.execute('insert into communityinviterequests (domain,role, person, invitedBy, status,type) values(\'doctor.wipro.blr\',\'moderator\',\'mythili@gmail.com\',\'sandy\',\'invitesent\',\'invite\');');
  });
  /* ----------------------TEST CASE FOR GET METHOD-------------------------------------------*/

  // get list of data for particular domain
  it('should get data for specified domain', (done) => {
    request(app)
      .get(`${uri}doctor.wipro.blr`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'doctor.wipro.blr\'', (err, result) => {
            if (!err) {
              result.rows.length.should.deep.equal(3);
              result.rows[0].domain.should.deep.equal(res.body.domain);
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('requests').a('Array');
              res.body.requests.length.should.deep.equal(3);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // get lists of data for particular domain when domain is given in uppercase
  it('should get data for specified domain when in upper case', (done) => {
    request(app)
      .get(`${uri}DoCTOR.wIpRo.bLr`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'doctor.wipro.blr\'', (err, result) => {
            if (!err) {
              result.rows.length.should.deep.equal(3);
              result.rows[0].domain.should.deep.equal(res.body.domain);
              expect(res.body).to.have.property('domain').a('string');
              expect(res.body).to.have.property('requests').a('Array');
              res.body.requests.length.should.deep.equal(3);
              return done();
            }
            return done(err);
          });
        }
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
          return done();
        }
        res.body.should.deep.equal(values.notFound);
        return done();
      });
    return null;
  });
  /* ----------------------TEST CASE FOR POST METHOD-------------------------------------------*/

  // throw error when person email is empty when inviting

  it('should give error on post data in database when no email value is given', (done) => {
    client.execute('delete from communityinviterequests where domain = \'seconddomain\'');
    request(app)
      .post(`${uri}seconddomain/type/invite`)
      .send(values.noemail)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(0);
              res.body.should.deep.equal(values.emailempty);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // throw error when email is empty if type is request

  it('should give error on post data in database when email is empty if request occured', (done) => {
    client.execute('delete from communityinviterequests where domain = \'seconddomain\'');
    request(app)
      .post(`${uri}seconddomain/type/request`)
      .send(values.member)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(0);
              res.body.should.deep.equal(values.emailemptyrequest);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // throw error if type is wrong

  it('should give error on post data in database if type is wrong', (done) => {
    client.execute('delete from communityinviterequests where domain = \'seconddomain\'');
    request(app)
      .post(`${uri}seconddomain/type/dhsgfdfghj`)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(0);
              res.body.should.deep.equal(values.wrongtype);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // throw error if member is empty for type invite

  it('should give error on post data in database member is empty when invite occured', (done) => {
    client.execute('delete from communityinviterequests where domain = \'seconddomain\'');
    request(app)
      .post(`${uri}seconddomain/type/invite`)
      .send(values.invitemember)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(0);
              res.body.should.deep.equal(values.emptyinvitor);
              return done();
            }
            return done(err);
          });
        }
      });
  });


  // throw error if role is wrongly given for type invite

  it('should give error on post data in database when role is wrongly given when invite occured', (done) => {
    client.execute('delete from communityinviterequests where domain = \'seconddomain\'');
    request(app)
      .post(`${uri}seconddomain/type/invite`)
      .send(values.roleinvite)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(0);
              res.body.should.deep.equal(values.rolenotapplicable);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // throw error if role is empty for type invite

  it('should give error on post data in database role is empty when invite occured', (done) => {
    client.execute('delete from communityinviterequests where domain = \'seconddomain\'');
    request(app)
      .post(`${uri}seconddomain/type/invite`)
      .send(values.inviterole)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(0);
              res.body.should.deep.equal(values.roleempty);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // throw error if member is already there in commnunity while inviting people

  it('should give error on post data in database member is there in community when invite occured', (done) => {
    client.execute('delete from communityinviterequests where domain = \'seconddomain\'');
    request(app)
      .post(`${uri}seconddomain/type/invite`)
      .send(values.checkingmember)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(0);
              res.body.should.deep.equal(values.memberexist);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // Insert date for type invite
  it('should insert data into the table when invite occured', (done) => {
    client.execute('delete from communityinviterequests where domain = \'firstdomain\'');
    let iterations = 0;
    request(app)
      .post(`${uri}firstdomain/type/invite`)
      .send(values.data)
      .end((error, res) => {
        if (!error) {
          const persons = values.data.invitee;
          persons.forEach((data) => {
            const query = `SELECT * FROM communityinviterequests where domain ='firstdomain' and person ='${data.email}'`;

            client.execute(query, (err, result) => {
              if ((!err)) {
                result.rows[0].person.should.be.equal(data.email);
                result.rows[0].role.should.be.equal(data.role);
                result.rows[0].invitedby.should.be.equal(values.data.invitedby);
                res.body.should.deep.equal(values.rowcreated);
              }
            });
            iterations += 1;
          });
          if (iterations === persons.length) {
            iterations.should.deep.equal(persons.length);
            return done();
          }
        }
        return done(error);
      });
  });


  // Insert date for type request
  it('should insert data into the table when request occured', (done) => {
    client.execute('delete from communityinviterequests where domain = \'seconddomain\'');
    request(app)
      .post(`${uri}seconddomain/type/request`)
      .send(values.requestinput)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(1);
              result.rows[0].status.should.be.equal('requested');
              result.rows[0].type.should.be.equal('request');
              result.rows[0].person.should.be.equal('gokul@gmail.com');
              res.body.should.deep.equal(values.rowcreated);
              return done();
            }
            return done(err);
          });
        }
      });
  });
  /* ----------------------TEST CASE FOR UPDATE METHOD---------------------------------*/

  // error throw when role is wrong when the type is request
  it('should give error on update data in database when role is wrong while the type is request', (done) => {
    request(app)
      .patch(`${uri}request/seconddomain/person/gokul@gmail.com`)
      .send(values.wrongrole)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(1);
              result.rows[0].status.should.not.be.equal('approved');
              result.rows[0].type.should.be.equal('request');
              result.rows[0].person.should.be.equal('gokul@gmail.com');
              res.body.should.deep.equal(values.notupdate);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // error throw when member is empty for type request

  it('should give error on update status in database when member is empty while the type is request', (done) => {
    request(app)
      .patch(`${uri}request/seconddomain/person/gokul@gmail.com`)
      .send(values.emptyapprover)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\' and person = \'gokul@gmail.com\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(1);
              result.rows[0].status.should.not.be.equal('approved');
              result.rows[0].type.should.be.equal('request');
              result.rows[0].person.should.be.equal('gokul@gmail.com');
              res.body.should.deep.equal(values.notupdate);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // error throw when role is empty for type request

  it('should give error on update status in database when role is empty while the type is request', (done) => {
    request(app)
      .patch(`${uri}request/seconddomain/person/gokul@gmail.com`)
      .send(values.emptyrole)
      .expect(400)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\' and person = \'gokul@gmail.com\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(1);
              result.rows[0].status.should.not.be.equal('approved');
              result.rows[0].type.should.be.equal('request');
              result.rows[0].person.should.be.equal('gokul@gmail.com');
              res.body.should.deep.equal(values.notupdate);
              return done();
            }
            return done(err);
          });
        }
      });
  });
  // update status for request type
  it('update status in database when the type is request', (done) => {
    request(app)
      .patch(`${uri}request/seconddomain/person/gokul@gmail.com`)
      .send(values.valueforrequest)
      .expect(201)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\' and person = \'gokul@gmail.com\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(1);
              result.rows[0].status.should.be.equal('approved');
              result.rows[0].type.should.be.equal('request');
              result.rows[0].person.should.be.equal('gokul@gmail.com');
              result.rows[0].invitedby.should.be.equal('hari');
              result.rows[0].role.should.be.equal('admin');
              res.body.should.deep.equal(values.modified);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // update status for invite type
  it('update status in database when the type is invite', (done) => {
    request(app)
      .patch(`${uri}invite/firstdomain/person/jamun@gmail.com`)
      .expect(201)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'firstdomain\' and person = \'jamun@gmail.com\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(1);
              result.rows[0].status.should.be.equal('accepted');
              result.rows[0].type.should.be.equal('invite');
              result.rows[0].person.should.be.equal('jamun@gmail.com');
              result.rows[0].invitedby.should.be.equal('janaki');
              result.rows[0].role.should.be.equal('admin');
              res.body.should.deep.equal(values.modified);
              return done();
            }
            return done(err);
          });
        }
      });
  });
  /* -----------------------------TEST CASE FOR DELETE----------------------------------------*/

  // throw error when value for delete is not in table
  it('throw error when value for delete is not in table', (done) => {
    request(app)
      .delete(`${uri}huhfugfdgfd/person/yyyyyy@gmail.com`)
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
  it('delete the domain and person from the table when invite is rejected', (done) => {
    request(app)
      .delete(`${uri}firstdomain/person/jamun@gmail.com`)
      .expect(201)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'firstdomain\' and person = \'jamun@gmail.com\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(0);
              res.body.should.deep.equal(values.deleted);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  // value for delete the row when the request rejected
  it('delete the domain and person from the table when request is rejected', (done) => {
    request(app)
      .delete(`${uri}seconddomain/person/gokul@gmail.com`)
      .expect(201)
      .end((error, res) => {
        if (!error) {
          client.execute('SELECT * FROM communityinviterequests where domain = \'seconddomain\' and person = \'gokul@gmail.com\'', (err, result) => {
            if (!err) {
              result.rows.length.should.be.equal(0);
              res.body.should.deep.equal(values.deleted);
              return done();
            }
            return done(err);
          });
        }
      });
  });

  after('', () => {
    client.execute('DELETE FROM communityinviterequests where domain=\'doctor.wipro.blr\'');
    client.execute('DELETE FROM communityinviterequests where domain=\'seconddomain\'');
    client.execute('DELETE FROM communityinviterequests where domain=\'firstdomain\'');
    client.execute('DELETE FROM communityroles where domain=\'firstdomain\'');
    client.execute('DELETE FROM communityroles where domain=\'seconddomain\'');
    client.execute('DELETE FROM communitymembership where domain=\'seconddomain\' and username=\'raja@gmail.com\'');
  });
});
