const wrongdata = { error: 'Please enter valid values!!' };

const rowcreated = { message: 'Inserted' };

const modified = { message: 'Updated' };

const deleted = { message: 'Deleted' };

const notFound = { error: 'please enter a valid domain name' };

const erroroperation = { error: 'Unexpected error occurred, please try again...!' };

const notupdate = { error: 'Not updated due to invalid values' };

const notdeleted = { error: 'Unable to delete the domain and person' };


/* -------------------test case for checking POST method -------------------------------*/
const data = {
  invitee: [{ email: 'amu@gmail.com', role: 'admin' }, { email: 'jamun@gmail.com', role: 'admin' }],
  invitedby: 'janaki',
};


// throw error when member is there if type is request
const member = {
  invitee: [{ email: 'veni@gmail.com', role: 'admin' }],
  invitedby: 'harrri',
};

// throw error when role is there if type is request
const role = {
  invitee: [{ email: 'veni@gmail.com', role: 'moderator' }],
  invitedby: '',
};

// throw error if member is empty for type invite
const invitemember = {
  invitee: [{ email: 'veni@gmail.com', role: 'admin' }, { email: 'viswa@gmail.com', role: 'admin' }],
  invitedby: '',
};


// throw error if role is empty for type invite
const inviterole = {
  invitee: [{ email: 'veni@gmail.com', role: '' }, { email: 'viswa@gmail.com', role: 'admin' }],
  invitedby: 'susu',
};

// person is empty

const noemail = {
  invitee: [{ email: '', role: 'admin' }],
  invitedby: 'janaki',

};

// member(approver) and role should be empty when type is request
const requestinput = {
  invitee: [{ email: 'gokul@gmail.com', role: '' }],
  invitedby: '',

};

// wrong role is given
const roleinvite = {
  invitee: [{ email: 'gokul@gmail.com', role: 'developer' }],
  invitedby: 'sandy',

};

/* ---------------------------test case for checking PATCH method----------------------------*/
// member is empty

const emptyapprover = {
  invitedby: '',
  role: 'moderator',
};

// throw error when role is empty if type request
const emptyrole = {
  invitedby: 'hari',
  role: '',
};

// throw error when role is wrong if type request
const wrongrole = {
  invitedby: 'hari',
  role: 'worker',
};

// correct data for status update when the type is request

const valueforrequest = {
  invitedby: 'hari',
  role: 'admin',
};

module.exports = {

  wrongdata,
  rowcreated,
  modified,
  data,
  noemail,
  emptyapprover,
  valueforrequest,
  deleted,
  member,
  requestinput,
  invitemember,
  notFound,
  erroroperation,
  notupdate,
  notdeleted,
  inviterole,
  role,
  emptyrole,
  roleinvite,
  wrongrole,
};
