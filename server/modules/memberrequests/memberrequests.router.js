const router = require('express').Router();

const controller = require('./memberrequests.controller');


// calling a method for inserting all the values into the table

router.post('/send', (req, res) => {
  try {
    return controller.createInvitation(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// calling a method for updating the status

router.patch('/action/:id', (req, res) => {
  try {
    return controller.updateInvitation(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// calling a method for rejecting the status

router.delete('/rejected/:id', (req, res) => {
  try {
    return controller.rejectedInviteRequest(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// calling the method for getting all values from the table

router.get('/lists', (req, res) => {
  try {
    return controller.gettingMembers(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// calling the method for getting the values for the particular id

router.get('/:id', (req, res) => {
  try {
    return controller.gettingMembersById(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
