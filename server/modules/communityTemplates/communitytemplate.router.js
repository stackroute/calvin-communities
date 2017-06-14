const router = require('express').Router();
const controller = require('./communitytemplate.controller');


router.get('/templates', (req, res) => {
  try {
    res.send(controller.getListOfTemplates());
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});
router.get('/templates/:templatename', (req, res) => {
  try {
    res.send(controller.getSpecifiedTemplateData(req.params.templatename));
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
