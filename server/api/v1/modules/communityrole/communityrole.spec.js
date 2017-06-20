const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const app = require('../../../../app');

const request = require('supertest');

const connectionString = require('../../../../config');

const model = require('cassandra-driver');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

const postdata1 = [
  {
        domain: 'prakhar',
        role: 'developer',
        actions: {
            post: 'true',
            likes: 'false'
        },
        toolId: 'quora'
    
  },
  {
        domain: 'africans',
        role: 'cricketer',
        actions: {
            post: 'false',
            likes: 'true'
        },
        toolId: 'git'
}
];
const patchdata = {
  actions: {
    hellos_patch: 'patch_done_finally',
    likes_patch: 'patch_done_finally',
  },
  toolid: 'quora_patch',

};
describe('Create a communityrole and update it', () => {
  before(() => {});
  it('Create a new communityrole', (done) => {
    request(app)
      .post('/api/v1/communityrole')
      .send(postdata1)
      .then(() => {
        console.log("BEFORE CLIENT EXECUTE testcase");
        client.execute("SELECT * from communityroles where domain='prakhar'", (err, result) => {
          if (!err) {
            console.log("Result from testcase "+result.rows[0]);
            result.rows.length.should.be.equal(1);
            result.rows[0].actions.should.deep.equal(postdata1[0].actions);
            done();
          }
        });
      })
      .catch((err) => {
        console.log("In error");
        done(err);
      });
  });

  it('Update actions of communityrole', (done) => {
    request(app)
      .patch('/api/v1/communityrole/prakhar/developer')
      .send(patchdata)
      .then(() => {
        client.execute("SELECT * from communityroles where domain='prakhar'", (err, result) => {
          if (!err) {
            result.rows[0].actions.should.have.property('hellos_patch').equal(patchdata.actions.hellos_patch);
            done();
          }
        });
      })
      .catch((err) => {
        done(err);
      });
  });

  after(() => {
     client.execute("DELETE FROM communityroles where domain='prakhar'");
     client.execute("DELETE FROM communityroles where domain='africans'");
  });
});