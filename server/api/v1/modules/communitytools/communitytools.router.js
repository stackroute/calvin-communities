/* ---------------------ROUTER----------------------*/


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

router.get('/:domainname', (req, res) => {
  try {
    const domainName = req.params.domainname;
    communityToolCtrl.getTools(domainName, (err, results) => {
      if (err) {
                // console.log('Error in communityToolCtrl.getTools error: ', err);
        return res.status(404).send(err);
      }

      return res.send(results);
    });
  } catch (err) {
        // console.log('Unexpected error in fetching community roles ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.get('/:domain/:tool', (req, res) => {
  try {
    const domainName = req.params.tools;
    communityToolCtrl.getActions(domainName, (err, results) => {
      if (err) {
                // console.log('Error in communityToolCtrl.getTools error: ', err);
        return res.status(404).send(err);
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

router.post('/', (req, res) => {
  try {
    const dataFromBody = req.body;
    communityToolCtrl.postTools(dataFromBody, (err) => {
      if (err) {
                // console.log('Error in communityToolCtrl.postTools error: ', err);
        return res.status(404).send(err);
      }

      return res.status(201).send({ message: 'tool created' });
    });
  } catch (err) {
        // console.log('Unexpected error in fetching community roles ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.patch('/:domain/:tool', (req, res) => {
  try {
    const dataFromBody = req.body;
    const dataFromParams = req.params;
    communityToolCtrl.modifyTool(dataFromBody, dataFromParams, (err) => {
      if (err) {
                // console.log('Error in communityToolCtrl.postTools error: ', err);
        return res.status(404).send(err);
      }

      return res.send({ message: 'Tool modified' });
    });
  } catch (err) {
        // console.log('Unexpected error in fetching community roles ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.delete('/:domain/:tool', (req, res) => {
  try {
    communityToolCtrl.deleteTool(req.params, (err) => {
      if (err) {
                // console.log('Error in communityToolCtrl.postTools error: ', err);
        return res.status(404).send(err);
      }

      return res.send({ message: 'deleted' });
    });
  } catch (err) {
    return res.status(404).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.delete('/action/:domain/:tool/:name', (req, res) => {
  try {
    const dataFromParams = req.params;
    // console.log(dataFromParams);
    communityToolCtrl.deleteAction(dataFromParams, (err) => {
      if (err) {
        return res.status(404).send({ error: 'Error in operation, please try later..!' });
      }

      return res.send({ message: 'Deleted Actions' });
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.delete('/event/:domain/:tool/:name', (req, res) => {
  try {
    const dataFromParams = req.params;
    communityToolCtrl.deleteEvent(dataFromParams, (err) => {
      if (err) {
        return res.status(404).send({ error: 'Error in operation, please try later..!' });
      }

      return res.send({ message: 'Deleted Events' });
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});


module.exports = router;
