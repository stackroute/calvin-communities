const router = require('express').Router();

const controller = require('./memberrequests.controller');

/*
 * Effective URI of the API is GET /memberrequests/:domain
 *
 * API for returning all lists of a specified domain
 *
 * URL Parameter
 *  - Domain: specify a specific domain, to get all its lists
 *
 */

router.get('/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    controller.gettingValuesByDomain(domain, (err, results) => {
      if (err) {
        console.log('Error in controller.gettingValuesByDomain error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }

      return res.send(results);
    });
  } catch (err) {
    console.log('Unexpected error in fetching list for particular domain ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});


/*
 * Effective URI of the API is POST /memberrequests/membership
 *
 * API for inserting the username and domain name if invite or request occured
 *
 */


router.post('/membership', (req, res) => {
  try {
    const values = req.body;
    controller.InsertData(values, (err) => {
      if (err) {
        console.log('Error in controller.InsertData error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      return res.send({ message: 'Inserted' });
    });
  } catch (err) {
    console.log('Unexpected error in inserting values ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});


/*

 * Effective URI of the API is PATCH /memberrequests/:domain/:person
 *
 * API for updating the status for a specified domain and person
 *
 * URL Parameter
 *  - domain and person: specify a specific domain and person, to update particular domain
 *
 */


router.patch('/:domain/:person', (req, res) => {
  try {
    const params = req.params;
    const bodyData = req.body;
    controller.updateStatus(params, bodyData, (err) => {
      if (err) {
        console.log('Error in controller.updateStatus error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }

      return res.send({ message: 'Updated' });
    });
  } catch (err) {
    console.log('Unexpected error in updating for particular id ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});

/*
 * Effective URI of the API is DELETE /memberrequests/:domain/:person
 *
 * API for delete the row in a table of a specified domain
 *
 * URL Parameter
 *  - Domain: specify a specific domain, to delete the row
 *
 */

router.delete('/:domain/:person', (req, res) => {
  try {
    const domain = req.params.domain;
    const person = req.params.person;
    controller.rejectedInviteRequest(domain, person, (err) => {
      if (err) {
        console.log('Error in  controller.rejectedInviteRequest error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      return res.send({ message: 'Deleted' });
    });
  } catch (err) {
    console.log('Unexpected error in deleting particular domain ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});

module.exports = router;
