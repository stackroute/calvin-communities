const router = require('express').Router();
const templateCtrl = require('./communitytemplate.controller');

/*
 * API for returning all the templates.
 *
 * Effective URI of the API for all the templates is
 * GET /communitytemplates?purpose=purpose
 *
 * Data Parameter
 *  - purpose: specify a specific purpose, to get the data's about the template.
 */
router.get('/', (req, res) => {
  try {
    if (req.query.purpose) {
      return res.send(templateCtrl.getTemplatesOfPurpose(req.query.purpose.toLowerCase()));
    }
    return res.send(templateCtrl.getListOfTemplates());
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});
/*
 * API for returning all the templates.
 *
 * Effective URI of the API for all the templates is
 * GET /communitytemplates/allpurposes
 *
 */
router.get('/allpurposes', (req, res) => {
  try {
    return res.send(templateCtrl.getListOfPurposes());
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected internal error occurred, please try later...!' });
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
router.get('/:templatename', (req, res) => {
  try {
    return res.send((templateCtrl.getTemplateOfTemplateName(req.params.templatename)));
  } catch (err) {
    return res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
