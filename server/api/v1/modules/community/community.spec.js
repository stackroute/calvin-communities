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
  const alldata = {
    name: 'a nice name',
    domain: 'firstdomain',
    owner: 'psharneja',
    tags: ['one', 'two'],
    avatar: 'wedAS.JPG',
    description: 'this is the first community',
    purpose: 'sports',
    template: 'surgeon',
    visibility: 'Public',

  };

  const domainincaps = {
    name: 'a nice name',
    domain: 'SECONDDOMAIN',
    owner: 'psharneja',
    tags: ['one', 'two'],
    avatar: 'wedAS.JPG',
    description: 'this is the first community',
    purpose: 'sports',
    template: 'surgeon',
    visibility: 'Public',

  };

  const editdata = {
    name: 'another name',
    updatedby: 'someone else',
    description: 'this is now changed',
    avatar: 'aaaa.jpg',
    visibility: 'Private',
    tags: ['new', 'data'],
    status: 'Inactive',
  };

/**
*
* all incorrect data here
*
*/

  const wrongdomain = {
    name: 'a nice name',
    domain: 'firstd$,omain',
    owner: 'psharneja',
    tags: ['one', 'two'],
    avatar: 'wedAS.JPG',
    description: 'this is the first community',
    purpose: 'sports',
    template: 'surgeon',
    visibility: 'Public',

  };

  const noname = {
    domain: 'firstdomain',
    owner: 'psharneja',
    tags: ['one', 'two'],
    avatar: 'wedAS.JPG',
    description: 'this is the first community',
    purpose: 'sports',
    template: 'surgeon',
    visibility: 'Public',
  };

  const notemplate = {
    name: 'a newer community',
    domain: 'firstthingdomain',
    owner: 'psharneja',
    tags: ['one', 'two'],
    avatar: 'wedAS.JPG',
    description: 'this is the first community',
    purpose: 'sports',
    visibility: 'Public',
  };

  const wrongtemplate = {
    name: 'a newer community',
    domain: 'firstlydomain',
    owner: 'psharneja',
    tags: ['one', 'two'],
    avatar: 'wedAS.JPG',
    template: 'sometemplate',
    description: 'this is the first community',
    purpose: 'sports',
    visibility: 'Public',
  };

  const notags = {
    name: 'a newer community',
    domain: 'firstdomain',
    owner: 'psharneja',
    avatar: 'wedAS.JPG',
    description: 'this is the first community',
    purpose: 'sports',
    template: 'surgeon',
    visibility: 'Public',
  };

/**

*/

/**
*use POST request to create a new community with all correct data
*
*
*/

  it('should create a new community and return new community\'s data', (done) => {
    request
    .post(`/api/v1/communities/${alldata.domain}`)
    .send(alldata)
    .then((result) => {
      result.body.domain.should.be.equal(alldata.domain);
      result.body.owner.should.be.equal(alldata.owner);
      result.status.should.be.equal(201);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*use POST request to create a new community which already exists
*
*
*/

  it('should give an error as community already exists', (done) => {
    request
    .post(`/api/v1/communities/${alldata.domain}`)
    .send(alldata)
    .then((result) => {
      result.body.error.should.equal('Domain Already Exists');
      result.status.should.be.equal(500);
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
    .get(`/api/v1/communities/${alldata.domain}`)
    .then((result) => {
      result.body.domain.should.be.equal(alldata.domain);
      result.body.owner.should.be.equal(alldata.owner);
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
    .patch(`/api/v1/communities/${alldata.domain}`)
    .send(editdata)
    .then((result) => {
      result.body.domain.should.be.equal(alldata.domain);
      result.body.updatedby.should.be.equal(editdata.updatedby);
      result.body.visibility.should.be.equal(editdata.visibility);
      result.status.should.be.equal(202);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*use POST request to add a community and pass domainname in caps
*
*
*/
  it('should give me details of a community for which we\'ve passed the domain name in caps', (done) => {
    request
    .post(`/api/v1/communities/${domainincaps.domain}`)
    .send(domainincaps)
    .then((result) => {
      result.body.domain.should.be.equal(domainincaps.domain.toLowerCase());
      result.body.owner.should.be.equal(domainincaps.owner);
      result.status.should.be.equal(201);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*use POST request to add a community and pass wrong template name
*
*
*/
  it('should give error at time of creation of community as template name doesn\'t exist', (done) => {
    request
    .post(`/api/v1/communities/${wrongtemplate.domain}`)
    .send(wrongtemplate)
    .then((result) => {
      result.body.error.should.equal('A Template Name is supposed to be chosen from mentioned list only');
      result.status.should.be.equal(500);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

/**
*use POST request to add a community and give  wrong domainname
*
*
*/
  it('should give me error ash we\'ve passed specialcharacters in domain name', (done) => {
    request
    .post(`/api/v1/communities/${wrongdomain.domain}`)
    .send(wrongdomain)
    .then((result) => {
      result.body.error.should.equal('Domain Name has to be at least 5 characters long and consist of Alphanumeric Values and a (.)');
      result.status.should.be.equal(500);
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
    .post(`/api/v1/communities/${editdata.domain}`)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('Please pass some data to process');
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
    .post(`/api/v1/communities/${noname.domain}`)
    .send(noname)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('A Name needs to be passed');
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
    .post(`/api/v1/communities/${notemplate.domain}`)
    .send(notemplate)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('A Template Value needs to be passed');
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
    .patch(`/api/v1/communities/${notags.domain}`)
    .send(notags)
    .then((result) => {
      result.status.should.be.equal(500);
      result.body.error.should.equal('At least one Tag is required to to be passed');
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
