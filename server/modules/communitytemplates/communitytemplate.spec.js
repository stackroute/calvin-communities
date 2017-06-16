const chai = require('chai').should();
const assert = chai.assert;
const expect = chai.expect;
const app = require('../../app');
const request = require('supertest');
const templates = require('./templates');


const surgeon = {
    templateName: 'surgeon',
    purpose: 'Medical',
    description: 'This template will provides you the required tools and roles to create a surgeon community',
    tools: [{
        Id: 100,
        Name: 'Digital Healthcare',
        Description: 'connecting verified and credentialed physicians from countries around the world.',
    }, {
        Id: 200,
        Name: 'WeMedUp',
        Description: 'connecting verified and credentialed physicians from countries around the world.',
    }, {
        Id: 500,
        Name: 'sermo',
        Description: 'connecting verified and credentialed physicians from countries around the world.',
    }],
    roles: ['Admin', 'Moderator', 'Member'],
};

describe('Retrieve the specified template data', () => {
    it(' should retrieve specified template data ', (done) => {
        request(app)
            .get('/community/templates/surgeon')
            .end((err, res) => {
                if (err) { done(err);
                    return; }
                templates.filter((element) => {
                    if (element.templateName == surgeon)
                    // expect(res.body).to.deep.equal(element.templateName);
                    { res.body.should.deep.equal(element); }
                });
                done();
            });
    });
    describe('Specified template does not exist', () => {
        it('the specified template does not exist', (done) => {
            request(app)
                .get('/community/templates/travel')
                .end((err, res) => {
                    if (err) { done(err);
                        return; }
                    res.status.should.be.equal(404);
                    done();
                });
        });
    });
    describe('List the templates ', () => {
        it('list of templates are equal', (done) => {
            request(app)
                .get('/community/templates')
                .end((err, res) => {
                    if (err) { done(err);
                        return; }
                    res.body.should.deep.equal(templates);
                    res.status.should.equal(200);
                    done();
                });
        });
    });
    describe('List the template tools', () => {
        it('Display the tools for the templates', (done) => {
            request(app)
                .get('/community/templates')
                .end((err, res) => {
                    if (err) { done(err);
                        return; }
                    templates.filter((element) => {
                        // let tools = element.tools;
                        // expect(tools).should.be.equal()
                        res.status.should.be.equal(200);
                    });
                    done();
                });
        });
    });
    describe('Roles should be an array', () => {
        it('roles should be array', (done) => {
            request(app)
                .get('/community/templates')
                .end((err, res) => {
                    if (err) { done(err);
                        return; }
                    templates.filter((element) => {
                        res.status.should.be.equal(200);
                    });
                });
        });
    });
});
