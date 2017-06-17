const wrongdata = { message: 'Wrong Data Inputs' };

const updatemsg = { message: 'Community updated.' };

const rowcreated = { message: 'Community created.' };

const completepost = {
  domain: 'prubhy',
  avatar: '/wqvveev.jpg',
  description: 'This ia a random community, you must ignore it just...',
  name: 'neelanjan',
  owner: 'simar',
  poster: '/dvwvw.jpg',
  roles: [
    'againthesame',
    'random',
  ],
  status: 'active',
  tags: [
    'eyes',
    'ortho',
    'physicist',
  ],
  template: 'doctors',
};

const notags = {
  domain: 'runrabitrun',
  name: 'qwvwqvv',
  owner: 'pssssss',
  template: 'ewvewv',
  tags: '',
  roles: ['random', 'againthesame'],

};

const data = {
  domain: 'runrabitrun',
  name: 'qwvwqvv',
  owner: 'pssssss',
  template: 'ewvewv',
  tags: ['ortho', 'eyes', 'physicist'],
  status: 'Active',
  roles: ['random', 'againthesame'],

};

const patchnotags = {
  domain: 'raster',
  name: 'illuminati',
  updatedby: 'pk',
  description: 'to update and patch checking',
  status: 'Active',
};

const patchcorrect = {
  domain: 'raster',
  name: 'illuminati',
  description: 'to update and patch checking',
  updatedby: 'pk',
  status: 'Active',
  tags: ['new', 'tags', 'here'],
};

const patchnoowner = {
  domain: 'raster',
  name: 'illuminati',
  description: 'to update and patch checking',
  status: 'Active',
  tags: ['new', 'tags', 'here'],
};

const noname = {
  domain: 'runrabitrun',
  owner: 'pssssss',
  template: 'ewvewv',
  tags: ['ortho', 'eyes', 'physicist'],
  roles: ['random', 'againthesame'],
};
const emptyname = {
  domain: 'runrabitrun',
  name: '',
  owner: 'pssssss',
  template: 'ewvewv',
  tags: ['ortho', 'eyes', 'physicist'],
  roles: ['random', 'againthesame'],
};
const getdomain = {
  domain: 'prabh',
  avatar: null,
  createdby: null,
  createdon: '2017-06-15T06:53:03.031Z',
  description: null,
  name: 'ewvwve',
  owner: null,
  poster: null,
  roles: [
    'againthesame',
    'random',
  ],
  status: null,
  tags: [
    'eyes',
    'ortho',
    'physicist',
  ],
  template: 'dvsvds',
  updatedby: null,
  updatedon: '2017-06-15T06:53:03.031Z',
};

module.exports = {
  wrongdata,
  rowcreated,
  data,
  noname,
  notags,
  emptyname,
  getdomain,
  completepost,
  patchcorrect,
  patchnoowner,
  patchnotags,
  updatemsg,
};
