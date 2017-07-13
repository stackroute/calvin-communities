const model = require('cassandra-driver');
const app = require('../../../../app');
const supertest = require('supertest');
const communityCtrl = require('./community.controller');
const logger = require('../../../../logger');
const connectionString = require('../../../../config').connectionString;

// Should is used as assert on data, hence lint thinks should is never used,
// to avoid it, require is not assigned to a variable
require('chai').should();

const request = supertest(app);

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


describe('get/ post/ patch community ', () => {
  before(() => {
    client.execute('TRUNCATE communities')
            .then(() => {})
            .catch(() => {});
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
    status: 'enable',
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
    updatedby: 'someoneelse',
    description: 'no,this is changed',
    avatar: 'illum.jpg',
    visibility: 'Private',
    tags: ['new', 'data'],
    domain: 'firstdomain',
    status: 'disable',
    purpose: 'sports',
  };

  const dataarray = ['firstdomain', 'seconddomain'];
  const dataarraystring = "'firstdomain','seconddomain'";

    /**
     *
     * all incorrect data here
     *
     */

  const wrongdataarray = ['firstdomain', 'thirdnonexistingdomain'];
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
    status: 'enable',
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
            .end(() => {
              const query = `SELECT * FROM communities where domain = '${alldata.domain}'`;
              client.execute(query,
                    (error, dbresult) => { // eslint-disable-line consistent-return
                      if (error) {
                        logger.debug('First Test', error);
                        return done(error);
                      }
                      dbresult.rows[0].domain.should.be.equal(alldata.domain);
                      dbresult.rows[0].purpose.should.be.equal(alldata.purpose);
                      dbresult.rows[0].description.should.be.equal(alldata.description);
                      dbresult.rows[0].avatar.should.be.equal(alldata.avatar);
                      dbresult.rows[0].owner.should.be.equal(alldata.owner);
                      done();
                    });
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
            .end((err, result) => {
              if (err) { done(err); }
              result.body.error.should.equal('Domain Already Exists');
              result.status.should.be.equal(400);
              const query = `SELECT * FROM communities where domain = '${alldata.domain}'`;
              client.execute(query,
                    (error, dbresult) => { // eslint-disable-line consistent-return
                      if (error) {
                        logger.debug('Second Test', error);
                        return done(error);
                      }
                      dbresult.rows[0].domain.should.be.equal(alldata.domain);
                      done();
                    });
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
            .end((err, result) => {
              if (err) { done(err); }
              const query = `SELECT * FROM communities where domain = '${alldata.domain}'`;
              client.execute(query,
                    (error, dbresult) => { // eslint-disable-line consistent-return
                      if (error) {
                        logger.debug('First Test', error);
                        return done(error);
                      }
                      dbresult.rows[0].domain.should.be.equal(result.body.domain);
                      dbresult.rows[0].purpose.should.be.equal(result.body.purpose);
                      dbresult.rows[0].description.should.be.equal(result.body.description);
                      dbresult.rows[0].avatar.should.be.equal(result.body.avatar);
                      dbresult.rows[0].owner.should.be.equal(result.body.owner);
                      done();
                    });
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
            .end((err, result) => {
              if (err) { done(err); }
              result.body.length.should.be.equal(0);
              result.status.should.be.equal(200);
              const query = 'SELECT * FROM communities where domain = \'chiKen\'';
              client.execute(query,
                    (error, dbresult) => { // eslint-disable-line consistent-return
                      if (error) {
                        logger.debug('Fourth Test', error);
                        return done(error);
                      }
                      dbresult.rows.length.should.be.equal(result.body.length);
                      done();
                    });
            });
  });

    /**
     *use PATCH request to edit data for a community
     *
     *
     */
  it('should edit details for a specific community', (done) => {
    request
            .patch(`/api/v1/communities/${editdata.domain}`)
            .send(editdata)
            .end((err) => {
              if (err) { done(err); }
              const query = `SELECT * FROM communities where domain = '${editdata.domain}'`;
              client.execute(query,
                    (error, dbresult) => { // eslint-disable-line consistent-return
                      if (error) {
                        logger.debug('Fifth Test', error);
                        done(error);
                      } // eslint-disable-line no-unreachable
                      dbresult.rows[0].domain.should.be.equal(editdata.domain);
                      dbresult.rows[0].purpose.should.be.equal(editdata.purpose);
                      dbresult.rows[0].description.should.be.equal(editdata.description);
                      dbresult.rows[0].avatar.should.be.equal(editdata.avatar);
                      dbresult.rows[0].updatedby.should.be.equal(editdata.updatedby);
                      dbresult.rows[0].visibility.should.be.equal(editdata.visibility);
                      done();
                    });
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
            .end((err, result) => {
              if (err) { done(err); }
              result.body.domain.should.be.equal(domainincaps.domain.toLowerCase());
              result.body.owner.should.be.equal(domainincaps.owner);
              result.status.should.be.equal(201);
              const domain = domainincaps.domain.toLowerCase();
              const query = `SELECT * FROM communities where domain = '${domain}'`;
              client.execute(query,
                    (error, dbresult) => { // eslint-disable-line consistent-return
                      if (error) {
                        logger.debug('Sixth Test', error);
                        done(error);
                      } // eslint-disable-line no-unreachable
                      dbresult.rows[0].domain.should.be.equal(result.body.domain);
                      dbresult.rows[0].owner.should.be.equal(result.body.owner);
                      done();
                    });
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
            .end((err, result) => {
              if (err) { done(err); }
              result.body.error.should.equal('A Template Name is supposed to be chosen from mentioned list only');
              result.status.should.be.equal(400);
              done();
            });
  });

    /**
     *use POST request to add a community and give  wrong domainname
     *
     *
     */
  it('should give me error as we\'ve passed special characters in domain name', (done) => {
    request
            .post(`/api/v1/communities/${wrongdomain.domain}`)
            .send(wrongdomain)
            .end((err, result) => {
              if (err) { done(err); }
              result.body.error.should.equal('Domain Name has to be at least 5 characters long and consist of Alphanumeric Values and a (.)');
              result.status.should.be.equal(400);
              done();
            });
  });

    /**
     *--Post Request, without giving any value
     */

  it('should return an error as no data is passed in body', (done) => {
    request
            .post(`/api/v1/communities/${editdata.domain}`)
            .end((err, result) => {
              if (err) { done(err); }
              result.status.should.be.equal(400);
              result.body.error.should.equal('Please pass some data to process');
              done();
            });
  });

    /**
     *-- Post Request, should give an error, as name is not passed
     */

  it('should return an error as no name is passed in body with data', (done) => {
    request
            .post(`/api/v1/communities/${noname.domain}`)
            .send(noname)
            .end((err, result) => {
              if (err) { done(err); }
              result.status.should.be.equal(400);
              result.body.error.should.equal('A Name needs to be passed');
              done();
            });
  });

    /**
     *-- Post Request, should give an error, as tamplate is not passed
     */

  it('should return an error as no template is passed in body with data', (done) => {
    request
            .post(`/api/v1/communities/${notemplate.domain}`)
            .send(notemplate)
            .end((err, result) => {
              if (err) { done(err); }
              result.status.should.be.equal(400);
              result.body.error.should.equal('A Template Value needs to be passed');
              done();
            });
  });


    /**
     * Patch Request, should give an error, as tags are not passed
     */

  it('should return an error as no tags are passed in body with data', (done) => {
    request
            .patch(`/api/v1/communities/${notags.domain}`)
            .send(notags)
            .end((err, result) => {
              if (err) { done(err); }
              result.status.should.be.equal(400);
              result.body.error.should.equal('At least one Tag is required to to be passed');
              done();
            });
  });
/*
*
* Testing controllers
*
*/


  it('should give data for multiple domains calling for data of multiple domains', (done) => {
    communityCtrl.getMultipleCommunities(dataarray,
     (error, result) => { // eslint-disable-line consistent-return
       if (error) return logger.debug(error);
       result.length.should.be.equal(dataarray.length);
       client.execute(`SELECT * FROM communities where domain in (${dataarraystring})`, (err, res) => {
         res.rows.should.deep.equal(result);
       });
       done();
     });
  });

  it('should return an error as not all domains exist when calling for data of multiple domains', (done) => {
    communityCtrl.getMultipleCommunities(wrongdataarray, (error) => {
      if (error) {
        logger.debug(error);
        error.should.be.equal('Please give correct domains');
        done();
      }
    });
  });

  it('should delete a domain from db if exists', (done) => {
    communityCtrl.deleteCommunity(alldata.domain, (error, result) => {
      if (error) { logger.debug(error); done(error); }
      result.should.be.equal('Deleted');
      const domain = alldata.domain.toLowerCase();
      client.execute(`select * from communities where domain = '${domain}'`, (err, res) => {
        res.rows.length.should.be.equal(0);
        done();
      });
    });
  });

  it('should return if delete is requested for a non existing domain', (done) => {
    const domain = 'randomdomain';
    communityCtrl.deleteCommunity(domain, (error) => {
      if (error) { error.should.be.equal('Nothing to Delete'); }
      client.execute(`select * from communities where domain = '${domain}'`, (err, res) => {
        res.rows.length.should.be.equal(0);
        done();
      });
    });
  });


  after(() => {
    client.execute('TRUNCATE communities')
            .then(() => {})
            .catch(() => {});
  });
});
