const router = require('express').Router();

const webhookCtrl = require('./webhook.controller');

router.post('/:token', (req, res) => {
  try {
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
