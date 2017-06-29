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

};


// throw error when member is there if type is request
const member = {
  domain: 'mercury',
  status: 'requested',
  person: ['veni@gmail.com'],
  type: 'request',
  member: 'harrri',
};

// throw error if member is empty for type invite
const invitemember = {
  domain: 'marine',
  status: 'invitesent',
  person: ['viswa@gmail.com'],
  type: 'invite',
  member: '',
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

};

// wrong value in type
const wrongtype =
  {
    domain: 'samsung',
    status: 'xyz',
    person: ['pooja@gmail.com'],
    type: 'yyyyyyyyyyy',
    member: 'janaki',

  };

// member(approver) should be empty when type is request
const requestinput = {
  status: 'requested',
  person: ['amudha@gmail.com'],
  type: 'request',
  member: '',

};

/* ---------------------------test case for checking PATCH method----------------------------*/

// status should be approved when the type is request

const checkrequesttype = {
  status: 'accepted',
  member: 'mani',
};

// member is empty

const emptyapprover = {
  status: 'approved',
  member: '',
};

// correct data for status update when the type is request

const valueforrequest = {
  status: 'approved',
  member: 'hari',
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
};
