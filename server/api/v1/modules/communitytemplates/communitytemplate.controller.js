const templates = require('./templates');

// controller for the list of templates which will be called in the router

function getListOfTemplates() {
  return templates;
}

// controller for the specified template data retrieved based on purpose
function getTemplatesOnPurpose(purpose) {
  let purposeData;
  templates.filter((element) => {
    if (element.purpose === purpose) {
      purposeData = element;
    }
  });
  return purposeData;
}

// controller for the specified template data retrieved based on templatename
function getTemplateOnTemplateName(templateName) {
  let templatename;
  templates.filter((element) => {
    if (element.templateName === templateName) {
      templatename = element;
    }
  });
  return templatename;
}
module.exports = {
  getListOfTemplates,
  getTemplatesOnPurpose,
  getTemplateOnTemplateName,
};
