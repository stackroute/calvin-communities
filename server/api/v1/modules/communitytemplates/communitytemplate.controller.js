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
  const unique = purposes.filter((element, index, arr) => {
    return arr.indexOf(element) == index
  });
  return unique;
}

/*
 * controller for the specified template data retrieved based on purpose
 */
function getTemplatesOfPurpose(purpose) {
  console.log(purpose);
  let templatesOnPurpose = [];
  templates.filter(element => {if(element.purpose.toLowerCase() === purpose){
    templatesOnPurpose.push(element);
  }});
  console.log("hello", templatesOnPurpose);
  if (templatesOnPurpose.length === 0) {
    return templates;
    console.log("nooo");
  }
  return templatesOnPurpose;
}

/*
 * controller for the specified template data retrieved based on templatename
 */

function getTemplateOfTemplateName(name) {
  const templatename = templates.filter(element => element.name === name);
  return templatename;
}

module.exports = {
  getListOfTemplates,
  getListOfPurposes,
  getTemplatesOfPurpose,
  getTemplateOfTemplateName,
};
