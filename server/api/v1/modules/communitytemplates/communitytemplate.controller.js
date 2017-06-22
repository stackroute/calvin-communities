const templates = require('./templates');

// controller for the list of templates which will be called in the router
function getListOfTemplates() {
  return templates;
}

// controller for the specified template data retrieved based on purpose
function getTemplatesOfPurpose(purpose) {
  const templatesOnPurpose = templates.filter(element => element.purpose === purpose);
  if (templatesOnPurpose.length === 0) {
    return templates;
  }
  return templatesOnPurpose;
}
// controller for the specified template data retrieved based on templatename
function getTemplateOfTemplateName(name) {
  const templatename = templates.filter(element => element.name === name);
  return templatename;
}

module.exports = {
  getListOfTemplates,
  getTemplatesOfPurpose,
  getTemplateOfTemplateName,
};
