const templates = require('./templates');
/*
 * controller for the list of templates which will be called in the router
 */
function getListOfTemplates() {
  return templates;
}

/*
 * controller for the list of templates which will be called in the router
 */
function getListOfPurposes() {
  const purposes = [];
  templates.forEach((templatesdata) => {
    purposes.push(templatesdata.purpose);
  });
  const unique = purposes.filter((element, index, arr) => arr.indexOf(element) === index);
  return unique;
}

/*
 * controller for the specified template data retrieved based on purpose
 */
function getTemplatesOfPurpose(purpose) {
  const templatesOnPurpose = templates.filter(element => element.purpose.toLowerCase() === purpose);
  if (templatesOnPurpose.length === 0) {
    return templates;
  }
  return templatesOnPurpose;
}

/*
 * controller for the specified template data retrieved based on templatename
 */

function getTemplateOfTemplateName(name) {
  const templatename =
  templates.filter(element => element.name.toLowerCase() === name.toLowerCase());
  return templatename;
}

module.exports = {
  getListOfTemplates,
  getListOfPurposes,
  getTemplatesOfPurpose,
  getTemplateOfTemplateName,
};
