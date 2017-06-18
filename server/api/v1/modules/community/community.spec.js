require('chai').should();

const app = require('../../../../app');

const request = require('supertest');

const config = require('../../../../config');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


/**
*use POST request to create a new communty with adll correct data
*
*
*/
describe('create a community ', function() {
	before( function(){
		client.execute("DELETE * FROM table community");
	});
	it('should create a new community and return new communitys data', function(done) {
		request(app)
		.post("/api/v1/community", {
      domain: 'myfirstsingle',
      name: 'the only app',
      purpose: 'testing',
      template: 'engineers',
      owner: 'simar',
      visibility: 'Active',
      avatar: '/abcdefg.jpg',
      description: 'This is the first post test',
      tags: ['this','aint','nothing'],
      roles: ['admin', 'moderator'],
    })
    .then( function(result){
      console.log(result);
      done();
    })
    .catch( function(err) {
      done(err);
    })
	})
})