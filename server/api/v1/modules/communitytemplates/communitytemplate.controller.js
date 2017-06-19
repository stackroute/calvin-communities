const templates = require('./templates');

// controller for the list of templates which will be called in the router

function getListOfTemplates() {
  return templates;
}

// controller for the specified template data retrieved based on purpose
function getTemplatesOnPurpose(purpose) {
  const purposeData = templates.filter(element => element.purpose === purpose);
  return purposeData;
}

// controller for the specified template data retrieved based on templatename
function getTemplateOnTemplateName(templateName) {
  const templatename = templates.filter(element => element.templateName === templateName);
  return templatename;
}
module.exports = {
  getListOfTemplates,
  getTemplatesOnPurpose,
  getTemplateOnTemplateName,
};
