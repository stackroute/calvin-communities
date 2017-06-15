require('express');

require('body-parser');

const service = require('./community.service');

function allcommunities(req, res) {
  service.getallcommunities()
  .then((result) => { res.status('200').send(result.rows); })
  .catch((error) => { res.status('404').send({ message: 'an error occurred' }); });
}

function addcommunity(req, res) {
  if (req.body.domain === undefined || req.body.name === undefined || req.body.owner === undefined) {
    res.status('401').send({ message: 'Wrong Data Inputs' }); return;
  }
  if (req.body.domain && req.body.name && req.body.owner && req.body.template) {
    service.addcommunity(req)
  .then((result) => { res.status('201').send({ message: 'Community created.' }); })
  .catch((error) => { res.status('404').send({ message: 'an error occurred' }); });
  } else res.status('401').send({ message: 'Wrong Data Inputs' });
}

function getcommunity(req, res) {
  service.getcommunity(req.params.id)
  .then((result) => { res.status('200').send(result.rows); })
  .catch((error) => { res.status('404').send({ message: 'an error occurred' }); });
}


module.exports = {
  allcommunities,
  addcommunity,
  getcommunity,

};
