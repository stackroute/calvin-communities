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

router.get('/:domain', (req, res) => {
  try {
    communityToolCtrl.getTools(req.params.domain, (err, results) => {
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
    communityToolCtrl.getCommunityTool(req.params, (err, results) => {
      if (err) {
        logger.debug('Error in communityToolCtrl.getTools error: ', err);
        return res.status(err[0]).send('An Error Occurred', err[1]);
      }

      return res.jsonp(results);
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
    const clubbingData = req.body;

    clubbingData.domain = req.params.domain;
    clubbingData.toolId = req.params.toolid;

    communityToolCtrl.postCommunityTool(clubbingData, (err, results) => {
      if (err) {
        return res.status(err[0]).json(err[1]);
      }
      return res.status(201).json({communityToolToken: results});
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.patch('/:domain/tools/:toolid', (req, res) => {
  try {
    communityToolCtrl.updateTool(req.params, req.body, (err, result) => {
      if (err) {
        // console.log('Error in communityToolCtrl.postTools error: ', err);
        return res.status(err[0]).send(err[1]);
      }

      return res.status(202).json({communityToolToken: result});
    });
  } catch (err) {
    // console.log('Unexpected error in fetching community roles ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

/* router.delete('/:domain/tools/:toolid/action/:name', (req, res) => {
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
});*/


module.exports = router;
