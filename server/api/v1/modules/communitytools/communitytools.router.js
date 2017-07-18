/* ---------------------ROUTER----------------------*/
const logger = require('../../../../logger');

const router = require('express').Router();

const communityToolCtrl = require('./communitytools.controller');

/*
 * Effective URI of the API is GET /api/communitytools/:domainname
 *
 * API for returning tool name,action and activity events of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its tools
 *
 */

router.get('/:domain/tools', (req, res) => {
  try {
    const domainName = req.params.domainname;
    communityToolCtrl.getTools(domainName, (err, results) => {
      if (err) {
        // console.log('Error in communityToolCtrl.getTools error: ', err);
        return res.status(400).send(err);
      }

      return res.send(results);
    });
  } catch (err) {
    // console.log('Unexpected error in fetching community roles ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.get('/:domain/tools/:toolid', (req, res) => {
  try {
    const domainName = req.params;
    communityToolCtrl.getActions(domainName, (err, results) => {
      if (err) {
        logger.debug('Error in communityToolCtrl.getTools error: ', err);
        return res.status(400).send(err);
      }

      return res.send(results);
    });
  } catch (err) {
    // console.log('Unexpected error in fetching community roles ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

/*
 * Effective URI of the API is POST /api/communitytools/
 *
 * API for adding tool name,action and activity events of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its tools
 *
 */

router.post('/:domain/tools/:toolid', (req, res) => {
  try {
    //const dataFromBody = req.body;
   // const dataFromParams = req.params.domainname;
    communityToolCtrl.postCommunityTools(req.params, req.body, (err, results) => {
      if (err) {
        // console.log('Error in communityToolCtrl.postTools error: ', err);
        return res.status(err[0]).json(err[1]);
      }
      // console.log('updated in communityToolCtrl.postTools ');
      return res.status(201).send(results);
    });
  } catch (err) {
    // console.log('Unexpected error in fetching community roles ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.patch('/:domain/tools/:toolid', (req, res) => {
  try {
    const dataFromBody = req.body;
    const dataFromParams = req.params;
    communityToolCtrl.modifyTool(dataFromBody, dataFromParams, (err) => {
      if (err) {
        // console.log('Error in communityToolCtrl.postTools error: ', err);
        return res.status(400).send(err);
      }

      return res.send({ message: 'Tool modified' });
    });
  } catch (err) {
    // console.log('Unexpected error in fetching community roles ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.delete('/:domain/tools/:toolid/action/:name', (req, res) => {
  try {
    communityToolCtrl.deleteAction(req.params, (err) => {
      if (err) {
        // console.log('Error in communityToolCtrl.postTools error: ', err);
        return res.status(400).send(err);
      }

      return res.send({ message: 'action deleted' });
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.delete('/:domain/tools/:toolid', (req, res) => {
  try {
    communityToolCtrl.deleteTool(req.params, (err) => {
      if (err) {
        // console.log('Error in communityToolCtrl.postTools error: ', err);
        return res.status(400).send(err);
      }

      return res.send({ message: 'deleted' });
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});


module.exports = router;
