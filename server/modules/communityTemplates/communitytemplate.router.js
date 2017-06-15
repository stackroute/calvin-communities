const router = require('express').Router();
const controller = require('./communitytemplate.controller');
const templateList = require('./templates');

// route to display the list of templates
router.get('/templates', (req, res) => {
  try {
    res.send(controller.getListOfTemplates(templateList));
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// route to display the specified template data
router.get('/templates/:templatename', (req, res) => {
  try {
    res.send(JSON.stringify(controller.getSpecifiedTemplateData(req.params.templatename)));
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
