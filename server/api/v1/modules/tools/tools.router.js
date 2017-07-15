/* ---------------------ROUTER----------------------*/


const router = require('express').Router();

const ToolCtrl = require('./tools.controller');

/*
 * Effective URI of the API is GET /api/tools/:domainname
 *
 * API for returning all tools of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its tools
 *
 */

router.get('/:toolid', (req, res) => {
  try {
    const domainName = req.params.toolid;
    // console.log('get method');
    ToolCtrl.getTools(domainName, (err, results) => {
      if (err) {
        // console.log('Error in ToolCtrl.getTools error: ', err);
        return res.status(400).send(err);
      }

      return res.send(results);
    });
  } catch (err) {
    // console.log('Unexpected error in fetching community tools ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

router.get('/', (req, res) => {
  try {
    // console.log("toolsrouter");
    ToolCtrl.getDomainsAndTools((err, results) => {
      // console.log("passed");
      if (err) {
        // console.log("error");
        return res.status(400).send(err);
      }
      // console.log("results", results);
      return res.send(results);
    });
  } catch (err) {
    // console.log("error occured in catch");
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});

module.exports = router;
