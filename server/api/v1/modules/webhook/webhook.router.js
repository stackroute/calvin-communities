const router = require('express').Router();

const webhookCtrl = require('./webhook.controller');

router.post('/:token', (req, res) => {
  try {
    // console.log('router');
    // console.log(req.params.token);
    webhookCtrl.verifyToken(req.params.token, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.send(result);
    });
  } catch (err) {
    // console.log('errrrr', err);
    return res.status(500).send({ error: 'Unexpected internal error...' });
  }
  return null;
});

module.exports = router;
