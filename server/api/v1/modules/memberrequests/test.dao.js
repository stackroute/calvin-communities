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
  person: ['mandu@gmail.com', 'palavi@gmail.com'],
  type: 'invite',
  member: 'janaki',
  role: 'moderator',
};


// throw error when member is there if type is request
const member = {
  status: 'requested',
  person: ['veni@gmail.com'],
  type: 'request',
  member: 'harrri',
  role: '',
};

// throw error when role is there if type is request
const role = {
  status: 'requested',
  role: 'moderator',
  person: ['veni@gmail.com'],
  type: 'request',
  member: '',
};

// throw error if member is empty for type invite
const invitemember = {
  domain: 'marine',
  status: 'invitesent',
  person: ['viswa@gmail.com'],
  type: 'invite',
  member: '',
  role: 'moderator',
};


// throw error if role is empty for type invite
const inviterole = {
  domain: 'marine',
  status: 'invitesent',
  person: ['viswa@gmail.com'],
  type: 'invite',
  member: 'susu',
  role: '',
};

// person is empty

const noemail = {
  domain: 'samsung',
  status: 'invitesent',
  person: [],
  type: 'invite',
  member: 'janaki',

};

// domain is empty
const nodomainname = {

  domain: '',
  status: 'invitesent',
  person: ['pooja@gmail.com'],
  type: 'invite',
  member: 'janaki',

};

// wrong value in status
const statuswrong = {

  domain: 'samsung',
  status: 'xyz',
  person: ['pooja@gmail.com'],
  type: 'invite',
  member: 'janaki',
  role: '',

};

// wrong value in type
const wrongtype =
  {
    domain: 'samsung',
    status: 'xyz',
    person: ['pooja@gmail.com'],
    type: 'yyyyyyyyyyy',
    member: 'janaki',
    role: '',

  };

// member(approver) and role should be empty when type is request
const requestinput = {
  status: 'requested',
  person: ['amudha@gmail.com'],
  type: 'request',
  member: '',
  role: '',

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
  nodomainname,
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
