const templates = require('./templates');

// controller for the list of templates which will be called in the router

function getListOfTemplates() {
  return templates;
}

// controller for the specified template data

function getSpecifiedTemplateData(purpose) {
  let result;
  templates.forEach((element) => {
    if (element.purpose === purpose) {
      result = element;
    }
  });
  return result;
}
module.exports = {
  getListOfTemplates,
  getSpecifiedTemplateData,
};
