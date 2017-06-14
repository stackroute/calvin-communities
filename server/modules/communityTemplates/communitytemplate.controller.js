function getListOfTemplates() {
  return ['technical', 'professional', 'medical', 'teachers', 'sports'];
}
// function getPurposeOfTemplates(req,res)
// {
//let query = ('SELECT purpose from communities');        
//         client.execute( query, (err, result) => {
//         if(err) throw console.log(err)
//                 console.log('success');
//                 return(result.rows);

//         })
// }
function getSpecifiedTemplateData(templateName) {
  const data = require('./templates/'+ templateName);
  return data;
}

module.exports = {
  getListOfTemplates,
  getSpecifiedTemplateData,
};
