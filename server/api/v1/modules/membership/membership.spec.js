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
// describe('Test cases for membership services', () => {
//   before(() => {
//      client.execute(`DELETE FROM membership where username='mr.x';`);
//      client.execute(`DELETE FROM membership where username='mr.w';`);
//      client.execute(`DELETE FROM membership where username='mr.digital';`);
//   });
//   it('should through error resource not found while getting data', (done) => {
//     request(app)
//       .get(`${apiVersion}/membership/username`)
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       .expect(404)
//       .end((err, res) => {
//         if (err) {
//           done(err);
//           return;
//         }
//         res.body.should.deep.equal(resourceError);
//         done();
//       });
//   });
//     after('', () => {
//     client.execute(`DELETE FROM membership where username='mr.x';`);
//      client.execute(`DELETE FROM membership where username='mr.w';`);
//      client.execute(`DELETE FROM membership where username='mr.digital';`);
//   });
// });
// describe('Positive test case check for all methods for communitymembership', () => {
//   /**
//    *Run before all test cases in this block
//    *
//    * before hook to execute arbitrary code before this block
//    *
//    *
//    */
//   before(() => {
//   });
//    /*Testing post method to add member details
//    *
//    * POST request
//    *
//    *
//    */
//   it('Add new members to a community', (done) => {
//     client.execute(`DELETE FROM membership where username='${postData[1].username}';`);
//     let iterateTestData = 0;
//     membership.userCommunityDetails(domainFromURI, postData, (err, result) => {
//         if (!err) {
//           //results.body.should.deep.equal(value.successAddedMember);
//           client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[1].username}'`, (error1, res) => {
//             if (!error1) {
//               res.rows.length.should.be.equal(value.addMembers.length);
//               value.addMembers.forEach((data) => {
//                 client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[1].username}' and domain = '${data.domain}'`, (error, result) => {
//                   if (!error) {
//                     // logger.debug(result.rows[0].domain);
//                     // logger.debug(result.rows[0].username);
//                     // logger.debug(result.rows[0].role);
//                     // logger.debug(data.username);
//                     // logger.debug(data.role);
//                     result.rows[0].username.should.deep.equal(postData[1].username);
//                     result.rows[0].domain.should.deep.equal(data.domain);
//                     result.rows[0].role.should.deep.equal(data.role);
//                     iterateTestData += 1;
//                     if (iterateTestData === res.rows.length) {
//                       iterateTestData.should.deep.equal(value.addMembers.length);
//                       done();
//                     }
//                   }
//                 });
//               });
//             }
//           });
//         }
//       });
//   });
//   /**
//    *Testing get method to get details of a particular domain
//    *
//    * GET request
//    *
//    *
//    */
//   it('Get a members in a community', (done) => {
//     // client.execute(`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} where domain='wipro.chnni';`);
//     let iterateTestData = 0;
//     request(app)
//       .get(`${apiVersion}membership/${postData[1].username}`)
//       .end((error, res) => {
//         logger.debug(results.body.communityDetails.length);
//         if (!err) {
//           client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[1].username}'`, (error1, res) => {
//             if (!error1) {
//               res.rows.length.should.be.equal(results.body.communityDetails.length);
//               results.body.MemberDetails.forEach((data) => {
//                 client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[1].username}' and domain = '${data.domain}'`, (error, result) => {
//                   if (!error) {
//                     // logger.debug(result.rows[0].domain);
//                     // logger.debug(result.rows[0].username);
//                     // logger.debug(result.rows[0].role);
//                     // logger.debug(data.username);
//                     // logger.debug(data.role);
//                     result.rows[0].username.should.deep.equal(results.body.username);
//                     result.rows[0].domain.should.deep.equal(data.domain);
//                     result.rows[0].role.should.deep.equal(data.role);
//                     iterateTestData += 1;
//                     if (iterateTestData === res.rows.length) {
//                       iterateTestData.should.deep.equal(results.body.communityDetails.length);
//                       done();
//                     }
//                   }
//                 });
//               });
//             }
//           });
//         }
//       });
//   });
//   /**
//    *Testing patch method to update role of a members
//    *
//    * PATCH request
//    *
//    *
//    */
//   it('update a role of a members in a community', (done) => {
//     let iterateTestData = 0;
//     request(app)
//     membership.modifyRoleOfMemberFromCommunity(domainFromURI, modifyData, (err, results) => {
//         if (!err) {
//           results.body.should.deep.equal(value.successUpdatedMembers);
//           client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[1].username}'`, (error1, res) => {
//             if (!error1) {
//               res.rows.length.should.be.equal(value.updateMembers.length);
//               value.updateMembers.forEach((data) => {
//                 client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[1].username}' and domain = '${data.domain}'`, (error, result) => {
//                   if (!error) {
//                     // logger.debug(result.rows[0].domain);
//                     // logger.debug(result.rows[0].username);
//                     // logger.debug(result.rows[0].role);
//                     // logger.debug(data.username);
//                     // logger.debug(data.role);
//                     result.rows[0].username.should.deep.equal(postData[1].username);
//                     result.rows[0].domain.should.deep.equal(data.domain);
//                     result.rows[0].role.should.deep.equal(data.role);
//                     iterateTestData += 1;
//                     if (iterateTestData === res.rows.length) {
//                       iterateTestData.should.deep.equal(value.addMembers.length);
//                       done();
//                     }
//                   }
//                 });
//               });
//             }
//           });
//         }
//       });
//   });
//   /**
//    *Testing get method to get details of a particular domain
//    *
//    * GET request
//    *
//    *
//    */
  
//   /**
//    *Testing delete method to delete member details
//    *
//    * DELETE request
//    *
//    *
//    */
//   it('Delete a members from a community', (done) => {
//     let iterate = value.updateMembers.length;
//     request(app)
//     membership.removeMemberFromCommunity(domainFromURI, modifyData, (err, results) => {
//         if (!err) {
//           results.body.should.deep.equal(value.successDeletedMember);
//           client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[1].username}'`, (error1, res) => {
//             if (!error1) {
//               res.rows.length.should.be.equal(0);
//               value.updateMembers.forEach((data) => {
//                 client.execute(`SELECT domain, role FROM membership WHERE username = '${postData[1].username}' and domain = '${data.domain}'`, (error, result) => {
//                   if (!error) {
//                     // logger.debug(result.rows[0].domain);
//                     // logger.debug(result.rows[0].username);
//                     // logger.debug(data.username);
//                     // logger.debug(data.role);
//                     result.rows[0].username.should.deep.equal(postData[1].username);
//                     result.rows[0].domain.should.deep.equal(data.domain);
//                   }
//                 });
//                 iterate -= 1;
//                 // logger.debug('iterate', iterate);
//                 // logger.debug('hi');
//               });
//               iterate.should.deep.equal(res.rows.length);
//               done();
//             }
//           });
//         }
//       });
//   });
//   /**
//    *Run after all test cases in this block
//    *
//    * after hook to execute arbitrary code after this block
//    *
//    *
//    */
//   after('', () => {
//   });
// });

