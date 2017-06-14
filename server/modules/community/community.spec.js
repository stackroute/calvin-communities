require('chai').should();

const app = require('../../app');
const request = require('supertest');

const wrongdata = { message: 'Wrong Data Inputs' };

const rowcreated = { message: 'Community created.' };

const data = {
  domain: 'runrabitrun',
  name: 'qwvwqvv',
  owner: 'pssssss',
  tags: ['ortho', 'eyes', 'physicist'],
  roles: {
    first: 'random',
    second: 'againthesame',
  },
};
const getdomain = {
  domain: 'janani',
  avatar: null,
  createdby: null,
  createdon: '2017-06-14T19:53:43.968Z',
  description: null,
  name: 'qwvwqvv',
  owner: null,
  poster: null,
  roles: {
    first: 'random',
    second: 'againthesame',
  },
  status: null,
  tags: [
    'eyes',
    'ortho',
    'physicist',
  ],
  template: null,
  updatedby: null,
  updatedon: '2017-06-14T19:53:43.968Z',
};

const dataAttheMoment = [
  {
    domain: 'asdfgh',
    avatar: 'sad',
    createdby: 'safdw',
    createdon: '2017-06-13T12:16:57.442Z',
    description: 'sdasd',
    name: 'asd',
    owner: 'asd',
    poster: 'asddad',
    roles: {
      sdf: 'dfsa',
      tty: 'hhd',
    },
    status: 'ere',
    tags: [
      'asd',
      'sad',
      'sdsad',
    ],
    template: 'sdf',
    updatedby: 'dfdfecasvw',
    updatedon: '2017-06-13T12:16:57.442Z',
  },
  {
    domain: 'prab',
    avatar: null,
    createdby: null,
    createdon: '2017-06-14T12:08:20.168Z',
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: '2017-06-14T12:08:20.168Z',
  },
  {
    domain: 'psssssss',
    avatar: null,
    createdby: null,
    createdon: null,
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      "'first'": 'random',
      "'second'": 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: null,
  },
  {
    domain: 'rasdfg',
    avatar: null,
    createdby: null,
    createdon: null,
    description: null,
    name: null,
    owner: null,
    poster: null,
    roles: null,
    status: null,
    tags: null,
    template: null,
    updatedby: null,
    updatedon: null,
  },
  {
    domain: 'asd',
    avatar: 'sad',
    createdby: 'safdw',
    createdon: '2017-06-13T15:38:17.797Z',
    description: 'sdasd',
    name: 'asd',
    owner: 'asd',
    poster: 'asddad',
    roles: {
      sdf: 'dfsa',
      tty: 'hhd',
    },
    status: 'ere',
    tags: [
      'asd',
      'sad',
      'sdsad',
    ],
    template: 'sdf',
    updatedby: 'dfdfew',
    updatedon: '2017-06-13T15:38:17.797Z',
  },
  {
    domain: 'prabhuuuuu',
    avatar: null,
    createdby: null,
    createdon: '2017-06-14T12:23:00.373Z',
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: '2017-06-14T12:23:00.373Z',
  },
  {
    domain: 'prabhuqevcveeuuuu',
    avatar: null,
    createdby: null,
    createdon: '2017-06-14T14:02:26.756Z',
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: '2017-06-14T14:02:26.756Z',
  },
  {
    domain: 'praaaaa',
    avatar: null,
    createdby: null,
    createdon: null,
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: null,
  },
  {
    domain: 'prakhraaaaaaa',
    avatar: null,
    createdby: null,
    createdon: '2017-06-14T07:52:15.375Z',
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: '2017-06-14T07:52:15.375Z',
  },
  {
    domain: 'adddddddsd',
    avatar: 'sad',
    createdby: 'safdw',
    createdon: '2017-06-13T16:08:56.583Z',
    description: 'sdasd',
    name: 'asd',
    owner: 'asd',
    poster: 'asddad',
    roles: {
      sdf: 'dfsa',
      tty: 'hhd',
    },
    status: 'ere',
    tags: [
      'asd',
      'sad',
      'sdsad',
    ],
    template: 'sdf',
    updatedby: 'dfdfew',
    updatedon: '2017-06-13T16:08:56.583Z',
  },
  {
    domain: 'prabhudeva',
    avatar: null,
    createdby: null,
    createdon: '2017-06-14T15:47:03.549Z',
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: '2017-06-14T15:47:03.549Z',
  },
  {
    domain: 'janani',
    avatar: null,
    createdby: null,
    createdon: '2017-06-14T19:14:32.904Z',
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: '2017-06-14T19:14:32.904Z',
  },
  {
    domain: 'fgh',
    avatar: 'sad',
    createdby: 'safdw',
    createdon: '2017-06-13T12:17:08.730Z',
    description: 'sdasd',
    name: 'asd',
    owner: 'asd',
    poster: 'asddad',
    roles: {
      sdf: 'dfsa',
      tty: 'hhd',
    },
    status: 'ere',
    tags: [
      'asd',
      'sad',
      'sdsad',
    ],
    template: 'sdf',
    updatedby: 'dfdfecasvw',
    updatedon: '2017-06-13T12:17:08.730Z',
  },
  {
    domain: 'raster',
    avatar: null,
    createdby: null,
    createdon: null,
    description: null,
    name: null,
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: null,
  },
  {
    domain: 'prakhraecvewaaaaaa',
    avatar: null,
    createdby: null,
    createdon: '2017-06-14T12:07:50.395Z',
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: '2017-06-14T12:07:50.395Z',
  },
  {
    domain: 'prabhaaaa',
    avatar: null,
    createdby: null,
    createdon: null,
    description: null,
    name: 'qwvwqvv',
    owner: null,
    poster: null,
    roles: {
      first: 'random',
      second: 'againthesame',
    },
    status: null,
    tags: [
      'eyes',
      'ortho',
      'physicist',
    ],
    template: null,
    updatedby: null,
    updatedon: null,
  },
];

describe('/gettingAllCommunities', () => {
  it('should show me all communities in database', (done) => {
    request(app)
    .get('/api/community')
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(dataAttheMoment);
      done();
    });
  });
});

// nothing given for domain, username or owner
describe('/post data in database', () => {
  it('should give error on post data in database as no values are given', (done) => {
    request(app)
    .post('/api/community')
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(wrongdata);
      done();
    });
  });
});
// post data in database
describe('/post data in database', () => {
  it('should post data in database', (done) => {
    request(app)
    .post('/api/community')
    .send(data)
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal(rowcreated);
      done();
    });
  });
});


// get data for particular domain
describe('/get data from database with :domain', () => {
  it('should get data for domain specified', (done) => {
    request(app)
    .get(`/api/community/${getdomain.domain}`)
    .end((err, res) => {
      if (err) { done(err); return; }
      res.body.should.deep.equal([getdomain]);
      done();
    });
  });
});

