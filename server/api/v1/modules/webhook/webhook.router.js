const router = require('express').Router();

const jwt = require('jsonwebtoken');

const webhookCtrl = require('./webhook.controller');

const config = require('../../../../appconfig/env/development');

router.post('/:token', (req, res) => {
  try {
  	console.log('router');

    // console.log('router');
    // console.log(req.params.token);
    webhookCtrl.publishEventToTopic(req.params.token, req.body, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.send(result);
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected internal error...' });
  }
  return null;
});

module.exports = router;
