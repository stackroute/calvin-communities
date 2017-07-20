const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const expect = chai.expect;
const app = require('../../../../app');

const request = require('supertest');

const toolEventService = require('./communitytoolmapping.controller');

const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const COMMUNITY_TOOL_EVENT_MAP = 'communitytooleventmap';


const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

const data = {
  domain: "engineer.wipro.blr",
  toolid: "sermo",
  event: "evid"
}
const Wrongdata = {
  domain: "engineers.wipro.blr",
  toolid: "sermo",
  event: "evid"
}

const eventData = {
  domain: "wipro.blr",
  toolid: "sermo",
}

describe('Test cases for all tool mapping events in a community', () => {
  before(() => {
    // runs before all tests in this block
    client.execute(`insert into communitytooleventmap (domain, toolid, eventid, activity, actor, description, eventname, metadata, object ) values('engineer.wipro.blr', 'sermo' ,'evid', 'somecommunityevent', 'some actor', 'random description', 'event1', 'metadata value', 'someobject');`);
    client.execute(`insert into communitytooleventmap (domain, toolid, eventid, activity, actor, description, eventname, metadata, object ) values('wipro.blr', 'sermo' ,'evid', 'somecommunityevent', 'some actor', 'random description', 'event1', 'metadata value', 'someobject');`);

  });


  it('should get tool events for specified domain', (done) => {
    toolEventService.getToolEventMapping(data, (error, results) => {
      if (!error) {
        client.execute(`select * from ${COMMUNITY_TOOL_EVENT_MAP} \
        where domain = 'engineer.wipro.blr' and toolid = 'sermo' and eventid = 'evid' `, (err, result) => {
          if (!err) {
            console.log(result.rows);
            console.log(results);
            result.rows.length.should.deep.equal(1);
            result.rows[0].toolid.should.deep.equal(results.toolid);
            result.rows[0].domain.should.deep.equal(results.domain);
            expect(results).to.have.property('toolid').a('string');
            expect(results).to.have.property('eventname').a('string');
            return done();
          }
          return null;
        });
      }
    });
    return null;
  });
  it('should get tool events for specified domain', (done) => {
    toolEventService.getToolMapping(Wrongdata, (error, results) => {
      if (!error) {
        client.execute(`select * from ${COMMUNITY_TOOL_EVENT_MAP} \
        where domain = 'engineers.wipro.blr' and toolid = 'sermo' and eventid = 'evid' `, (err, result) => {
          if (!err) {
            console.log(result.rows);
            console.log(results);
            result.rows.length.should.deep.equal(0);
            return done();
          }
          return null;
        });
      }
    });
    return null;
  });

  it('should get tool events for specified domain', (done) => {
    toolEventService.getToolMapping(eventData, (error, results) => {
      if (!error) {
        client.execute(`select * FROM communitytooleventmap WHERE domain = 'wipro.blr' and toolid = 'sermo'; `, (err, result) => {
          if (!err) {
            console.log(result.rows);
            console.log("result", results.toolid);
            result.rows.length.should.deep.equal(1);
            /*result.rows[0].toolid.should.deep.equal(results.toolid);
            result.rows[0].domain.should.deep.equal(results.domain);*/
            /*expect(results).to.have.property('toolid').a('string');
            expect(results).to.have.property('eventname').a('string');*/
            return done();
          }
          return null;
        });
      }
    });
    return null;
  });


  after('', () => {

    /*    client.execute("DELETE FROM tools where toolid='quora';");
        client.execute("DELETE FROM tools where toolid='sermo';");
        client.execute("DELETE FROM tools where toolid='stack-overflow';");*/
  });
});
