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

  status: 'invitesent',
  personrole: [{ email: 'july@gmail.com', role: 'moderator' }, { email: 'jamun@gmail.com', role: 'admin' }],
  type: 'invite',
  member: 'janaki',
};


// throw error when member is there if type is request
const member = {
  status: 'requested',
  personrole: [{ email: 'veni@gmail.com', role: 'moderator' }, { email: 'viswa@gmail.com', role: 'admin' }],
  type: 'request',
  member: 'harrri',
};

// throw error when role is there if type is request
const role = {
  status: 'requested',
  personrole: [{ email: 'veni@gmail.com', role: 'moderator' }, { email: 'viswa@gmail.com', role: 'admin' }],
  type: 'request',
  member: '',
};

// throw error if member is empty for type invite
const invitemember = {
  status: 'invitesent',
  personrole: [{ email: 'veni@gmail.com', role: 'moderator' }, { email: 'viswa@gmail.com', role: 'admin' }],
  type: 'invite',
  member: '',
  role: 'moderator',
};


// throw error if role is empty for type invite
const inviterole = {
  status: 'invitesent',
  personrole: [{ email: 'veni@gmail.com', role: '' }, { email: 'viswa@gmail.com', role: 'admin' }],
  type: 'invite',
  member: 'susu',
};

// person is empty

const noemail = {
  status: 'invitesent',
  personrole: [{ email: '', role: 'moderator' }, { email: 'viswa@gmail.com', role: 'admin' }],
  type: 'invite',
  member: 'janaki',

};

// wrong value in status
const statuswrong = {

  domain: 'samsung',
  status: 'xyz',
  personrole: [{ email: 'veni@gmail.com', role: 'moderator' }, { email: 'viswa@gmail.com', role: 'admin' }],
  type: 'invite',
  member: 'janaki',

};

// wrong value in type
const wrongtype =
  {
    domain: 'samsung',
    status: 'xyz',
    personrole: [{ email: 'veni@gmail.com', role: 'moderator' }, { email: 'viswa@gmail.com', role: 'admin' }],
    type: 'yyyyyyyyyyy',
    member: 'janaki',

  };

// member(approver) and role should be empty when type is request
const requestinput = {
  status: 'requested',
  personrole: [{ email: 'gokul@gmail.com', role: '' }, { email: 'saran@gmail.com', role: '' }],
  type: 'request',
  member: '',

};

/* ---------------------------test case for checking PATCH method----------------------------*/

// status should be approved when the type is request

const checkrequesttype = {
  status: 'accepted',
  member: 'mani',
  role: 'moderator',
};

// member is empty

const emptyapprover = {
  status: 'approved',
  member: '',
};

// throw error when role is empty if type request
const emptyrole = {
  status: 'approved',
  member: 'hari',
  role: '',
};

// correct data for status update when the type is request

const valueforrequest = {
  status: 'approved',
  member: 'hari',
  role: 'admin',
};

// correct date for status update when the type is invite

const checkinvitetype = {
  status: 'accepted',
};


module.exports = {

  wrongdata,
  rowcreated,
  modified,
  data,
  noemail,
  statuswrong,
  checkrequesttype,
  emptyapprover,
  checkinvitetype,
  valueforrequest,
  deleted,
  member,
  requestinput,
  wrongtype,
  invitemember,
  notFound,
  erroroperation,
  notupdate,
  notdeleted,
  inviterole,
  role,
  emptyrole,
};
