require('chai').should();

const index = require('./index');

const request = require('./supertest');

const service = require('./counter.service');


describe('to check with the get method', () => {
  it('should get the values from counters', (done) => {
    request(index)
      .get('/counter')
	  .end((err, res) => {
	  	res.status.should.be.equal(200);
    done();
  });
  });
});

describe('to check with the patch method', () => {
  it('should check whether the members count is incremented by 1', (done) => {
    request(index)
      .patch('/increment/member/abc')
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
});
describe('to check with the patch method', () => {
  it('should check whether the invitations count is incremented by 1', (done) => {
    request(index)
      .patch('/increment/invitation/abc')
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
});
describe('to check with the patch method', () => {
  it('should check whether the tools count is incremented by 1', (done) => {
    request(index)
      .patch('/increment/tool/abc')
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
});
describe('to check with the patch method', () => {
  it('should check whether the request count is incremented by 1', (done) => {
    request(index)
      .patch('/increment/requests/abc')
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
});

describe('to check with the patch method', () => {
  it('should check whether the members count is decremented by 1', (done) => {
    request(index)
      .patch('/decrement/member/abc')
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
});
describe('to check with the patch method', () => {
  it('should check whether the invitations count is decremented by 1', (done) => {
    request(index)
      .patch('/decrement/invitation/abc')
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
});
describe('to check with the patch method', () => {
  it('should check whether the tools count is decremented by 1', (done) => {
    request(index)
      .patch('/decrement/tool/abc')
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
});
describe('to check with the patch method', () => {
  it('should check whether the requests count is decremented by 1', (done) => {
    request(index)
      .patch('/decrement/requests/abc')
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
});
