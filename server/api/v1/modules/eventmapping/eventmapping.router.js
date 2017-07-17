const router = require('express').Router();
const logger = require('../../../../logger');
const eventmappingCtrl = require('./eventmapping.controller');


router.get('/:toolid/:domain/:event', (req, res) => {
  try {
    eventmappingCtrl.getToolEventMapping(req.params, (err, results) => {
      if (err) {
        logger.error('Error in eventmappingCtrl.getEventMapping, error: ', err);
        return res.status(err[0]).send({ error: err[1] });
      }
      return res.status(200).jsonp(results);
    });
  } catch (err) {
    logger.error('Unexpected error in fetching event details ', err[1]);
    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
  }
  return null;
});

router.get('/:toolid/:domain', (req, res) => {
  try {
    eventmappingCtrl.getToolMapping(req.params, (err, results) => {
      if (err) {
        logger.error('Error in eventmappingCtrl.getToolMapping, error: ', err);
        return res.status(err[0]).send({ error: err[1] });
      }
      return res.status(200).jsonp(results);
    });
  } catch (err) {
    logger.error('Unexpected error in fetching event details ', err[1]);
    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
  }
  return null;
});


router.post('/:toolid/:domain', (req, res) => {
  try {
    eventmappingCtrl.postEventMapping(req.params, req.body, (err, results) => {
      if (err) {
        logger.error('Error in eventmappingCtrl.postEventMapping, error: ', err);
        return res.status(err[0]).send({ error: err[1] });
      }
      return res.status(201).json(results);
    });
  } catch (err) {
    logger.error('Unexpected error in posting event details ', err[1]);
    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
  }
  return null;
});

router.patch('/:toolid/:domain', (req, res) => {
  try {
    eventmappingCtrl.updateEventMapping(req.params, req.body, (err, results) => {
      if (err) {
        logger.error('Error in eventmappingCtrl.updateEventMapping, error: ', err);
        return res.status(err[0]).send({ error: err[1] });
      }
      return res.status(202).json(results);
    });
  } catch (err) {
    logger.error('Unexpected error in updating event details ', err[1]);
    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
  }
  return null;
});


module.exports = router;
