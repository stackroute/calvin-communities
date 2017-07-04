const router = require('express').Router();

const communityCtrl = require('./community.controller');

const logger = require('../../../../logger');


/**
 * Get For all communities,
 * URI is: /api/v1/community
 * GET REQUEST
 *
 *
 */
router.get('/', (req, res) => { // eslint-disable-line consistent-return
  try {
    communityCtrl.getAllCommunities((err, results) => {
      if (err) {
        logger.error('Error in communityCtrl.allcommunities error: ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    logger.error('Unexpected error in fetching communities ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
  }
});


/**
 * POST For specific communities,
 * URI is: /api/v1/ community
 * POST REQUEST
 *
 *
 */
router.post('/:domain', (req, res) => { // eslint-disable-line consistent-return
  try {
    req.body.domain = req.params.domain;
    communityCtrl.addCommunity(req.body, (err, results) => {
      if (err) {
        logger.error('Error in communityCtrl.addcommunity error: ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
      }
      return res.status(201).jsonp(results[0]);
    });
  } catch (err) {
    logger.error('Unexpected error in adding community ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
  }
});


/**
 * Get For specific communities,
 * URI is: /api/v1/:domain community
 * GET REQUEST
 *
 *
 */
router.get('/:domain', (req, res) => { // eslint-disable-line consistent-return
  try {
    let counter = false;
    if (req.query.counter && req.query.counter.toString() === 'true') {
      counter = req.query.counter;
    }
    communityCtrl.getCommunity(req.params.domain, counter, (err, results) => {
      if (err) {
        logger.error('Error in communityCtrl.getcommunity error: ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
      }
      if (results.length === 0) {
        return res.send({ message: 'this domain is available for registration' });
      }
      return res.jsonp(results[0]);
    });
  } catch (err) {
    logger.error('Unexpected error in fetching community data ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
  }
});


/**
 * PATCH For specific communities,
 * URI is: /api/v1/ community
 * PATCH REQUEST
 *
 *
 */
router.patch('/:domain', (req, res) => { // eslint-disable-line consistent-return
  try {
    communityCtrl.updateCommunity(req.params.domain, req.body, (err, results) => {
      if (err) {
        logger.error('Error in communityCtrl.updatecommunity error:', err);
        return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
      }
      return res.status(202).jsonp(results[0]);
    });
  } catch (err) {
    logger.error('Unexpected error in patching community ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
  }
});

module.exports = router;
