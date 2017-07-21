const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

// const expect = chai.expect;

const model = require('cassandra-driver');

const supertest = require('supertest');

const app = require('../../../../app');

const request = supertest(app);

const membership = require('./membership.service');

const apiVersion = '/api/v1/';

const connectionString = require('../../../../config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});
const domainFromURI = 'stack';
const username = 'mr.x';

const postData = [{
  domain: 'stack',
  username: 'mr.x',
  role: 'admin',
}, {
  domain: 'wipro',
  username: 'mr.w',
  role: 'moderator',
}, {
  domain: 'digital',
  username: 'mr.digital',
  role: 'moderator',
}];

const modifyData = [{
  domain: 'stack',
  username: 'mr.x',
  role: 'member',
}];

describe('Test cases for membership services', () => {
  it('should insert the data in the database', (done) => {
    membership.userCommunityDetails(domainFromURI, postData, (error, result) => {
      if (error) {
        return done(error, undefined);
      }
      client.execute(`SELECT * FROM membership where username = '${username}' `, (err, res) => {
        if (err) {
          return done(err, undefined);
        }
        res.rows[0].domain.should.deep.equal(postData[0].domain);
        res.rows[0].username.should.deep.equal(postData[0].username);
        res.rows[0].role.should.deep.equal(postData[0].role);
        return done();
      });
      return result;
    });
  });
  it('should modify the data in the database', (done) => {
    membership.modifyRoleOfMemberInCommunity(domainFromURI, modifyData, (error, result) => {
      if (error) {
        return done(error, undefined);
      }
      client.execute(`SELECT * FROM membership where domain = '${domainFromURI}' AND username = '${username}'`, (err, res) => {
        if (err) {
          return done(err, undefined);
        }
        res.rows[0].domain.should.deep.equal(modifyData[0].domain);
        res.rows[0].username.should.deep.equal(modifyData[0].username);
        res.rows[0].role.should.deep.equal(modifyData[0].role);
        return done();
      });
      return result;
    });
  });
  it('should delete the data in the database', (done) => {
    membership.removeMemberFromCommunity(domainFromURI, modifyData, (error, result) => {
      if (error) {
        return done(error, undefined);
      }
      client.execute(`SELECT * FROM membership where domain = '${domainFromURI}' AND username = '${username}'`, (err, res) => {
        if (err) {
          return done(err, undefined);
        }
        res.rows.length.should.be.equal(0);
        return done();
      });
      return result;
    });
  });
});
describe('Test case for GET request', () => {
  it('should get the community list of a member', (done) => {
    request
      .get(`${apiVersion}membership/${postData[1].username}`)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[1].username}'`, (err, result) => {
          if (err) {
            return done(err, undefined);
          }
          result.rows[0].domain.should.deep.equal(res.body.communityDetails[0].domain);
          result.rows[0].role.should.deep.equal(res.body.communityDetails[0].role);
          return done();
        });
        return undefined;
      });
  });
  it('should throw error if the user details does not exist', (done) => {
    request
      .get(`${apiVersion}membership/${postData[0].username}`)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[0].username}'`, (err, result) => {
          if (err) {
            return done(err, undefined);
          }
          result.rows.length.should.deep.equal(0);
          return done();
        });
        return (undefined, res);
      });
  });
  describe('Test cases for the case-sensitivity', () => {
    it('should display the user details when the username specified in UPPERCASE', (done) => {
      request
        .get(`${apiVersion}membership/${postData[2].username}`)
        .end((error, res) => {
          if (error) {
            return done(error);
          }
          client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[2].username}'`, (err, result) => {
            if (err) {
              return done(err, undefined);
            }
            result.rows[0].domain.should.deep.equal(res.body.communityDetails[0].domain);
            result.rows[0].role.should.deep.equal(res.body.communityDetails[0].role);
            return done();
          });
          return undefined;
        });
    });
  });
  // after(() => {
  //   client.execute('TRUNCATE membership');
  // });
});

