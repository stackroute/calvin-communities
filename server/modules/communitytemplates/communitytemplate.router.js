const router = require('express').Router();
const controller = require('./communitytemplate.controller');

// route to display the list of templates
router.get('/templates', (req, res) => {
  try {
    return res.send(controller.getListOfTemplates());
  } catch (err) {
    console.log('Error occurred in getting templates ', err);
    res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// route to display the specified template data
router.get('/templates/:templatename', (req, res) => {
  try {
    return res.send((controller.getSpecifiedTemplateData(req.params.templatename)));
  } catch (err) {
    console.log('Error occurred in getting specific template ', err);
    res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
