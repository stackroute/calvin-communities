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

const noemail = {
  domain: 'samsung',
  status: 'invitesent',
  person: [],
  type: 'invite',
  member: 'janaki',

};
const nodomainname = {

  domain: '',
  status: 'invitesent',
  person: ['pooja@gmail.com'],
  type: 'invite',
  member: 'janaki',

};
const statuswrong = {

  domain: 'samsung',
  status: 'xyz',
  person: ['pooja@gmail.com'],
  type: 'invite',
  member: 'janaki',

};

// test case for checking patch method

const checkrequesttype = {
  status: 'accepted',
  member: 'mani',
};

const emptyapprover = {
  status: 'approved',
  member: '',
};

const valueforrequest = {
  status: 'approved',

  member: 'hari',
};
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
