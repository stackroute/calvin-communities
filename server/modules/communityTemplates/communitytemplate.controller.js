// const medical = require('./templates/medical');
// List the Templates
function getListOfTemplates() {
  return ['technical', 'professional', 'medical', 'teachers', 'sports'];
}
function getSpecifiedTemplateData(templateName) {
  return require(`./templates/${templateName}`);
}
module.exports = {
  getListOfTemplates,
  getSpecifiedTemplateData,
};
