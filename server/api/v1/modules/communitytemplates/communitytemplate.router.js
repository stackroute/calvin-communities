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
 *  GET /communitytemplates/purposes?purpose=purpose
 *
 * URL Parameter
 *  - purpose: specify a specific template name,to get the data's
 *                  about the template
 */
router.get('/purposes', (req, res) => {
  try {
    return res.send(templateCtrl.getTemplatesOfPurpose(req.query.purpose.toLowerCase()));
  } catch (err) {
    return res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

/*
 * API for returning the data for the specified template
 *
 * Effevtive URI of the API for the specified template is
 *  GET /communitytemplates/templatenames?name=name
 *
 * URL Parameter
 *  - templatename: specify a specific template name,to get the data's
 *                  about the template
 */
router.get('/templatenames', (req, res) => {
  try {
    return res.send((templateCtrl.getTemplateOfTemplateName(req.query.name)));
  } catch (err) {
    return res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
