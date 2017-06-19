require('chai').should();
const app = require('../../../../app');
const request = require('supertest');
const templateCtrl = require('./communitytemplate.controller');

// test case for list the templates

describe('Retrieve the list of templates', function () {
  let template;
  before(function() {
    template = [{
      templateName: 'surgeon',
      purpose: 'medical',
      description: 'This template will provides you the required tools and roles to create a medical community',
      tools: [{
        toolId: 'forum',
        actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
      }, {
        toolId: 'WeMedUp',
        actions: ['postmesage', 'read', 'Likemessage'],
      }, {
        toolId: 'sermo',
        actions: ['postmesage', 'read', 'Likemessage', 'edit'],
      }],
      role_actions: [{
        role: 'admin',
        actions: [{ action: 'post', grant: 'self' },
          { action: 'read', grant: 'self' },
        ],
      }, {
        role: 'moderator',
        actions: [{ action: 'edit', grant: 'self' },
          { action: 'post', grant: 'self' },
        ],
      }],
    }]
  });

  it(' should retrieve the list of templates', function (done) {
    request(app)
      .get('/api/v1/communitytemplates')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getListOfTemplates((result) => {
          res.body.should.deep.equal(result);
        });
        done();
      });
  });
});

// test case for the specific template data
describe('Retrieve the specified template data based on purpose', function () {
  it(' should retrieve specified template data on purpose ', function (done) {
    request(app)
      .get('/api/v1/communitytemplates/:purpose')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getTemplatesOnPurpose((result) => {
          res.body.should.deep.equal(result);
        });
        done();
      });
  });
});

// test case for the specific template data
describe('Retrieve the specified template data based on template name', function () {
  it(' should retrieve specified template data based on template name', function (done) {
    request(app)
      .get('/api/v1/communitytemplates/templates/:templatename')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        templateCtrl.getTemplateOnTemplateName((result) => {
          res.body.should.deep.equal(result);
        });
        done();
      });
  });
});
