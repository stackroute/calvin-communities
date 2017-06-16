// List the Templates
const templates = require('./templates');

function getListOfTemplates() {
  return templates;
}

// Get the specified template data
function getSpecifiedTemplateData(templateName) {
  let result;
  templates.forEach((element) => {
    if (element.templateName === templateName) {
      result = element;
    }
  });
  return result;
}
module.exports = {
  getListOfTemplates,
  getSpecifiedTemplateData,
};
