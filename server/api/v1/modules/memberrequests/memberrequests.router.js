const router = require('express').Router();

const controller = require('./memberrequests.controller');

const logger = require('../../../../logger');
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
        // console.log('Error in controller.gettingValuesByDomain error: ', err);
        return res.status(404).send(err);
      }

      return res.send(results);
    });
  } catch (err) {
    // console.log('Unexpected error in fetching list for particular domain ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});


/*
 * Effective URI of the API is POST /memberrequests/:domain/type/:type
 *
 * API for inserting the username and domain name if invite or request occured
 *
 */

router.post('/:domain/type/:type', (req, res) => {
  try {
logger.debug("router try", req.body);
    const dataFromBody = req.body;
    const dataFromParams = req.params.domain;
    const type = req.params.type;
    controller.InsertData(dataFromBody, dataFromParams, type, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      logger.debug("router results", results);
      return res.status(201).send({ message: 'Inserted' });
    });
  } catch (err) {
    // console.log('Unexpected error in inserting values ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

/*
 * Effective URI of the API is PATCH /memberrequests/invite/:domain/person/:person
 *
 * API for updating the status for a specified domain and person
 *
 * URL Parameter
 *  - domain and person: specify a specific domain and person, to update particular domain
 *
 */

router.patch('/invite/:domain/person/:person', (req, res) => {
  try {
    const params = req.params;
    // const body = req.body;
    controller.updateStatusForInvite(params, (err) => {
      if (err) {
        // console.log('Error in controller.updateStatus error: ', err);
        return res.status(400).send(err);
      }
      return res.status(201).send({ message: 'Updated' });
    });
  } catch (err) {
    // console.log('Unexpected error in updating for particular id ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

/*
 * Effective URI of the API is PATCH /memberrequests/request/:domain/person/:person
 *
 * API for updating the status for a specified domain and person
 *
 * URL Parameter
 *  - domain and person: specify a specific domain and person, to update particular domain
 *
 */

router.patch('/request/:domain/person/:person', (req, res) => {
  try {
    const params = req.params;
    const bodyData = req.body;
    controller.updateStatusForRequest(params, bodyData, (err) => {
      if (err) {
        // console.log('Error in controller.updateStatus error: ', err);
        return res.status(400).send(err);
      }
      return res.status(201).send({ message: 'Updated' });
    });
  } catch (err) {
    // console.log('Unexpected error in updating for particular id ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

/*
 * Effective URI of the API is DELETE /memberrequests/:domain/person/:person
 *
 * API for delete the row in a table of a specified domain
 *
 * URL Parameter
 *  - Domain: specify a specific domain, to delete the row
 *
 */

router.delete('/:domain/person/:person', (req, res) => {
  try {
    const domain = req.params.domain;
    const person = req.params.person;
    controller.rejectedInviteOrRequest(domain, person, (err) => {
      if (err) {
        // console.log('Error in  controller.rejectedInviteRequest error: ', err);
        return res.status(404).send(err);
      }
      return res.status(201).send({ message: 'Deleted' });
    });
  } catch (err) {
    // console.log('Unexpected error in deleting particular domain ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

module.exports = router;
