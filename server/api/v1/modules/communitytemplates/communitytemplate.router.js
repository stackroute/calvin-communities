const router = require('express').Router();
const templateCtrl = require('./communitytemplate.controller');

/*
 * API for returning all the templates.
 *
 * Effective URI of the API for all the templates is GET /communitytemplates
 *
 */
router.get('/', (req, res) => {
  try {
    return res.send(templateCtrl.getListOfTemplates());
  } catch (err) {
    return res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

/*
 * API for returning the data for the specified template
 *
 * Effevtive URI of the API for the specified template is
 *  GET /communitytemplates/:purpose
 *
 * URL Parameter
 *  - purpose: specify a specific template name,to get the data's
 *                  about the template
 */
router.get('/:purpose', (req, res) => {
  try {
    return res.send((templateCtrl.getTemplatesOnPurpose(req.params.purpose)));
  } catch (err) {
    return res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

/*
 * API for returning the data for the specified template
 *
 * Effevtive URI of the API for the specified template is
 *  GET /communitytemplates/:templatename
 *
 * URL Parameter
 *  - templatename: specify a specific template name,to get the data's
 *                  about the template
 */
router.get('/templates/:templatename', (req, res) => {
  try {
    return res.send((templateCtrl.getTemplateOnTemplateName(req.params.templatename)));
  } catch (err) {
    return res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
