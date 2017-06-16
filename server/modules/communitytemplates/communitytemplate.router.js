const router = require('express').Router();
const templateCtrl = require('./communitytemplate.controller');

/*
 * API for returning all the templates.
 * 
 * Effective URI of the API for all the templates is GET /community/templates
 *
 */ 
router.get('/templates', (req, res) => {
    try {
        return res.send(templateCtrl.getListOfTemplates());
    } catch (err) {
        console.log('Error occurred in getting templates ', err);
        res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
    }
});

/*
 * API for returning the data for the specified template
 *
 * Effevtive URI of the API for the specified template is 
 *  GET /community/templates/:templatename
 *  
 * URL Parameter
 *  - templatename: specify a specific template name,to get the data's 
 *                  about the template
 */
router.get('/templates/:templatename', (req, res) => {
    try {
        return res.send((templateCtrl.getSpecifiedTemplateData(req.params.templatename)));
    } catch (err) {
        console.log('Error occurred in getting specific template ', err);
        res.status(500)({ error: 'Unexpected internal error occurred, please try later...!' });
    }
});

module.exports = router;
