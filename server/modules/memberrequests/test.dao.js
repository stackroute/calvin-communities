const wrongdata = { message: 'Wrong Data Inputs' };

const rowcreated = { message: 'Invite or request sent' };

const modified = { message: 'Status modified' };

// test case for checking post method
const data = {
  domain: 'Godrej',
  status: 'invitesent',
  email: 'mandu@gmail.com',
  type: 'invite',
  approver: 'janaki',

};

const noemail = {
  domain: 'Samsung',
  status: 'invitesent',
  email: '',
  type: 'invite',
  approver: 'janaki',

};
const nodomainname = {

  domain: '',
  status: 'invitesent',
  email: 'pooja@gmail.com',
  type: 'invite',
  approver: 'janaki',

};
const statuswrong = {

  domain: 'samsung',
  status: 'xyz',
  email: 'pooja@gmail.com',
  type: 'invite',
  approver: 'janaki',

};

// test case for checking patch method

const checkrequesttype = {
  status: 'accepted',
  approver: 'mani',
};

const emptyapprover = {
  status: 'approved',
  approver: '',
};

const value = {
  status: 'approved',
  approver: 'harish',
};
const checkinvitetype = {
  status: 'accepted',
};

// get values for particular id
const getvalues = {
  id: '465f1b8a6b0a4e85a9add0a3228f678e',
  approver: 'ragul',
  domain: 'microsoft',
  email: 'janani@gmail.com',
  status: 'approved',
  type: 'request',
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
  value,
  checkinvitetype,

  getvalues,

};
