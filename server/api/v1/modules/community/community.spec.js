require('chai').should();

const model = require('cassandra-driver');

const app = require('../../../../app');

const supertest = require('supertest');

const request = supertest(app);

const connectionString = require('../../../../config').connectionString;

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


describe('get/ post/ patch community ', () => {
  before(() => {
    client.execute('TRUNCATE communities')
    .then(() => { })
    .catch(() => { });
  });

/**
*
* all correct data here
*
*/
  const data = {
    domain: 'myfirstsingle',
    name: 'the only app',
    purpose: 'testing',
    template: 'surgeon',
    owner: 'simar',
    status: 'Active',
    visibility: 'Public',
    avatar: '/abcdefg.jpg',
    description: 'This is the first post test',
    tags: ['this', 'aint', 'nothing'],
    roles: ['admin', 'moderator'],
  };
  const editdata = {
    name: 'Single Page',
    status: 'Inactive',
    visibility: 'Private',
    avatar: 'raster.jpg',
    updatedby: 'newpeople',
    description: 'This is the first patch test',
    tags: ['this', 'aint', 'nothing'],
  };
  const edittags = {
    name: 'Single Page',
    status: 'Inactive',
    visibility: 'Private',
    avatar: 'raster.jpg',
    updatedby: 'nikku',
    description: 'This is the second patch test',
    tags: ['here', 'new', 'tags', 'players'],
  };
  const insertmandatory = {
    domain: 'second',
    name: 'the only app',
    purpose: 'testing',
    template: 'surgeon',
    owner: 'simar',
    status: 'Active',
    visibility: 'Private',
    tags: ['this', 'aint', 'nothing'],
    roles: ['admin', 'moderator'],
  };

/**
*
* all incorrect data here
*
*/
  const nonamedata = {
    domain: 'myfirstsingle',
    purpose: 'testing',
    template: 'engineers',
    owner: 'simar',
    visibility: 'Active',
    avatar: '/abcdefg.jpg',
    description: 'This is the first post test',
    tags: ['this', 'aint', 'nothing'],
    roles: ['admin', 'moderator'],
  };
  const notemplatedata = {
    domain: 'myfirstsingle',
    purpose: 'testing',
    owner: 'simar',
    visibility: 'Active',
    avatar: '/abcdefg.jpg',
    description: 'This is the first post test',
    tags: ['this', 'aint', 'nothing'],
    roles: ['admin', 'moderator'],
  };
  const notagsdata = {
    purpose: 'testing',
    template: 'engineers',
    owner: 'simar',
    visibility: 'Public',
    avatar: '/abcdefg.jpg',
    description: 'This is the first post test',
    roles: ['admin', 'moderator'],
  };
  const norolesdata = {
    purpose: 'testing',
    template: 'engineers',
    owner: 'simar',
    visibility: 'Public',
    avatar: '/abcdefg.jpg',
    description: 'This is the first post test',
    tags: ['illuminati', 'secret'],
  };
  const wrongstatusdata = {
    purpose: 'testing',
    template: 'engineers',
    owner: 'simar',
    status: 'something',
    visibility: 'Public',
    avatar: '/abcdefg.jpg',
    description: 'This is the first post test',
    tags: ['illuminati', 'secret'],
  };

/**
*use POST request to create a new community with all correct data
*
*
*/

  it('should create a new community and return new community\'s data', (done) => {
    request
    .post(`/api/v1/communities/${data.domain}`)
    .send(data)
    .then((result) => {
      result.body.domain.should.be.equal(data.domain);
      result.body.owner.should.be.equal(data.owner);
      result.status.should.be.equal(201);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  /**
*use POST request to create a new community with only necessary data
*
*
*/
  it(`should create a new community and return new community's data for
   only minimal mandatory data provided`, (done) => {
    request
    .post(`/api/v1/communities/${insertmandatory.domain}`)
    .send(insertmandatory)
    .then((result) => {
      result.body.domain.should.be.equal(insertmandatory.domain);
      result.body.owner.should.be.equal(insertmandatory.owner);
      result.status.should.be.equal(201);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*use GET request to get a specific communty's  data
* /api/v1/communities/:domain
*
*/
  it('should give me details for a specific community', (done) => {
    request
    .get(`/api/v1/communities/${data.domain}`)
    .then((result) => {
      result.body.domain.should.be.equal(data.domain);
      result.status.should.be.equal(200);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*use GET request to get a specific communty's data and that domain is not registered
* /api/v1/communities/:domain
*
*/
  it('should tell me if the domain is available to register', (done) => {
    request
    .get('/api/v1/communities/chiKen')
    .then((result) => {
      result.body.message.should.be.equal('this domain is available for registration');
      result.status.should.be.equal(200);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*use PATCH request to edit data for a community
*
*
*/
  it('should edit details for a specific community', (done) => {
    request
    .patch(`/api/v1/communities/${data.domain}`)
    .send(editdata)
    .then((result) => {
      result.body.domain.should.be.equal(data.domain);
      result.body.updatedby.should.be.equal(editdata.updatedby);
      result.status.should.be.equal(202);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*use PATCH request to edit tags for a community
*
*
*/
  it('should edit details for a specific community', (done) => {
    request
    .patch(`/api/v1/communities/${data.domain}`)
    .send(edittags)
    .then((result) => {
      result.body.domain.should.be.equal(data.domain);
      result.body.updatedby.should.be.equal(edittags.updatedby);
      result.status.should.be.equal(202);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*--Post Request, without giving any value
*/

  it('should return an error as no data is passed in body', (done) => {
    request
    .post(`/api/v1/communities/${data.domain}`)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('Unexpected error occurred, try again later');
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*-- Post Request, should give an error, as name is not passed
*/

  it('should return an error as no name is passed in body with data', (done) => {
    request
    .post(`/api/v1/communities/${data.domain}`)
    .send(nonamedata)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('Unexpected error occurred, try again later');
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*-- Post Request, should give an error, as tamplate is not passed
*/

  it('should return an error as no template is passed in body with data', (done) => {
    request
    .post(`/api/v1/communities/${data.domain}`)
    .send(notemplatedata)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('Unexpected error occurred, try again later');
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  /**
*-- Post Request, should give an error, as wrong status passed
*/

  it('should return an error as wrong status is passed in body with data', (done) => {
    request
    .post(`/api/v1/communities/${data.domain}`)
    .send(wrongstatusdata)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('Unexpected error occurred, try again later');
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*-- Patch Request, should give an error, as tags are not passed
*/

  it('should return an error as no tags are passed in body with data', (done) => {
    request
    .patch(`/api/v1/communities/${data.domain}`)
    .send(notagsdata)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('Unexpected error occurred, try again later');
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*-- Patch Request, should give an error, as roles are not passed
*/

  it('should return an error as no roles are passed in body with data', (done) => {
    request
    .patch(`/api/v1/communities/${data.domain}`)
    .send(norolesdata)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('Unexpected error occurred, try again later');
      done();
    })
    .catch((err) => {
      done(err);
    });
  });


  after(() => {
    client.execute('TRUNCATE communities')
    .then(() => { })
    .catch(() => { });
  });
});
