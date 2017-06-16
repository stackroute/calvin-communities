const router = require('express').Router();
const controller = require('./communitytemplate.controller');

// route to display the list of templates
router.get('/templates', (req, res) => {
  try {
    res.status(200).json(controller.getListOfTemplates());
  } catch (err) {
    res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// route to display the specified template data
router.get('/templates/:templatename', (req, res) => {
  try {
    res.status(200).json(controller.getSpecifiedTemplateData(req.params.templatename));
  } catch (err) {
    res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
