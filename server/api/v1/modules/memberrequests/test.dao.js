const wrongdata = { error: 'Error in operation, please try later..!' };

const rowcreated = { message: 'Inserted' };

const modified = { message: 'Updated' };

const deleted = { message: 'Deleted' };


// test case for checking post method
const data = {
  domain: 'Godrej',
  status: 'invitesent',
  person: ['mandu@gmail.com'],
  type: 'invite',
  member: 'janaki',

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

// test case for checking patch method

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


};
