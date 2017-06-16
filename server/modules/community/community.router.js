const express = require('express');

require('body-parser');

const controller = require('./community.controller');

const router = express.Router();

router.get('/', (req,res) =>{ 
	try {
	controller.allcommunities()
	.then((result) => { res.status('200').send(result.rows); })
	.catch(() => { res.status('404').send({ message: `an error occurred` }); });
	} catch(err){
		res.status('404').send({ message: `an error occurred` });
	}
});

router.post('/', (req, res) => {
	try {
	let communityData = req.body;
	controller.addcommunity(communityData)
	.then(() => { res.status('201').send({ message: 'Community created.' }); })
	.catch(() => { res.status('500').send({ message: `an error occurred` }); });
	} catch(err) {
		res.status('500').send({ message: 'Wrong Data Inputs' });
	}
});

router.get('/:id', (req,res) => {
	try {
	controller.getcommunity(req.params.id)
	.then((result) => { res.status('200').send(result.rows); })
	.catch(() => { res.status('500').send({ message: `an error occurred` }) });
	} catch(err) {
		res.status('500').send({ message: `an error occurred` });
	}
});

router.patch('/:id', (req,res) => {
	try{
	controller.updatecommunity(req)
	.then(() => { res.status('202').send({ message: `Community updated.` }); })
	.catch(() => { res.status('500').send({ message: `an error occurred` }); });
	} catch(err) {
			res.status('500').send({ message: 'Wrong Data Inputs' });
	}
});


module.exports = router;
