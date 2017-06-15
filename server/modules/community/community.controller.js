require('express');

require('body-parser');

const service = require('./community.service');

function allcommunities(req, res) {
  service.getallcommunities()
  .then((result) => { res.status('200').send(result.rows); })
  .catch((error) => { res.status('404').send({ message: `an error occurred${error}` }); });
}

function addcommunity(req, res) {
	if (
		req.body.domain === undefined ||
		req.body.name === undefined ||
		req.body.owner === undefined ||
		req.body.template === undefined ||
    req.body.tags === undefined||
    req.body.status === undefined ||
    !req.body.domain || 
		!req.body.name || 
		!req.body.owner || 
		!req.body.template ||
    !req.body.tags ||
    req.body.tags.length === 0 ||
    req.body.status != ('Active' || 'Inactive')
		) {res.status('401').send({ message: 'Wrong Data Inputs' }); return;}
  
    service.addcommunity(req)
  .then((result) => { res.status('201').send({ message: 'Community created.' }); })
  .catch((error) => { res.status('404').send({ message: `an error occurred${error}` }); });
  
}

function getcommunity(req, res) {
  service.getcommunity(req.params.id)
  .then((result) => { res.status('200').send(result.rows); })
  .catch((error) => { res.status('404').send({ message: `an error occurred${error}` }); });
}
function updatecommunity (req, res) {
  if(
    req.body.tags === undefined ||
    req.body.tags.length === 0 ||
    req.body.status != ('Active' || 'Inactive') ||
    req.body.updatedby === undefined ||
    !req.body.updatedby
    ) {res.status('401').send({ message: 'Wrong Data Inputs' }); return;}

  service.updatecommunity(req.params.id, req.body)
  .then((result) => { res.status('202').send({ message: 'Community updated.' }); })
  .catch((error) => { res.status('404').send({ message: `an error occurred${error}` }); });
}


module.exports = {
  allcommunities,
  addcommunity,
  getcommunity,
  updatecommunity,

};
