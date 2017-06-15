// List the Templates
const templates = require('./templates');

function getListOfTemplates(templatelist) {
  return templatelist;
}

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
