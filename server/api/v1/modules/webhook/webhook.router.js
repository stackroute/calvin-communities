const router = require('express').Router();

const webhookCtrl = require('./webhook.controller');

router.get('/:verifytoken', (req, res) => {
  try {
  	console.log('router');
    webhookCtrl.verifyToken(req.query.token, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.send(result);
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected internal error...' });
  }
});

module.exports = router;
