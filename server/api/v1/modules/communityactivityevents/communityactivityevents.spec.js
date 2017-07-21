require('chai').should();
const app = require('../../../../app');
const request = require('supertest');
const activityevents = require('./activityeventstypes');
const activityeventsCtrl = require('./communityactivityevents.controller');

const apiVersion = '/api/v1';

// test case for the list of community activity events

describe('Test GET request to API /activityevents/', function() {
  it('Fetch all activityevents types', function(done) {
    request(app)
      .get(`${apiVersion}/activityevents`)
          .end((err, res) => {
            if (err) {
              done(err);
              return;
            }
            res.body.should.deep.equal(activityevents);
            res.body.length.should.be.equal(activityevents.length);
            done();
          });
      });
