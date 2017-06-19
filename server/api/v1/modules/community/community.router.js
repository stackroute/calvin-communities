const router = require('express').Router();
const communityCtrl = require('./community.controller');


/**
 * Get For all communities,
 * URI is: /api/v1/community
 * GET REQUEST
 *
 *
 */


router.get('/', (req, res) => {
  try {
    communityCtrl.getAllCommunities((err, results) => {
      if (err) {
        console.log('Error in communityCtrl.allcommunities error: ', err);
        return res.status(500).error({ error: 'Error in operation, try again later' });
      }
      return res.send(results);
    });
  } catch (err) {
    console.log('Unexpected error in fetching communities ', err);

    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });

    return res.status(500).error({ error: 'Unexpected error occurred, try again later' });

  }
});


/**
 * POST For specific communities,
 * URI is: /api/v1/ community
 * POST REQUEST
 *
 *
 */
router.post('/', (req, res) => {
  try {
    communityCtrl.addCommunity(req.body, (err, results) => {
      if (err) {
D
        console.log('Error in communityCtrl.postcommunity error: ', err);
        return res.status(500).send({ error: 'Error in operation, try again later' });
      }
      res.status(201).send(results);
    });
  } catch (err) {
    console.log('Unexpected error in adding community ', err);
    res.status(500).send({ message: 'an error occurred' });

        console.log('Error in communityCtrl.addcommunity error: ', err);
        return res.status(500).send({ error: 'Error in operation, try again later' });
      }
      return res.status(201).send(results);
    });
  } catch (err) {
    console.log('Unexpected error in adding community ', err);
    return res.status(500).send({ message: 'an error occurred' });

  }
});


/**
 * Get For specific communities,
 * URI is: /api/v1/:domain community
 * GET REQUEST
 *
 *
 */
router.get('/:domain', (req, res) => {
  try {
    communityCtrl.getCommunity(req.params.domain, (err, results) => {
      if (err) {
        console.log('Error in communityCtrl.getcommunity error: ', err);
        return res.status(500).send({ error: 'Error in operation, try again later' });
      }
<<<<<<< HEAD
      res.send(results);
    });
  } catch (err) {
    console.log('Unexpected error in fetching communities ', err);
    res.status(500).send({ error: 'Unexpected error occurred, try again later' });
=======
      if (results.length === 0) { return res.send({ message: 'this domain is available for registration' }); }
      return res.send(results);
    });
  } catch (err) {
    console.log('Unexpected error in fetching communities ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, try again later' });
>>>>>>> ce84c7f6f61f615fdfe6879b09384832047481c6
  }
});


/**
 * PATCH For specific communities,
 * URI is: /api/v1/ community
 * PATCH REQUEST
 *
 *
 */
router.patch('/:domain', (req, res) => {
  try {
    communityCtrl.updateCommunity(req.params.domain, req.body, (err, results) => {
      if (err) {
        console.log('Error in communityCtrl.updatecommunity error:', err);
        return res.status(500).send({ error: 'Error in Operation, try again later' });
      }
<<<<<<< HEAD
      res.status(202).send(results);
    });
  } catch (err) {
    console.log('Unexpected error in patching community ', err);
    res.status(500).send({ error: 'an error occurred' });
=======
      return res.status(202).send(results);
    });
  } catch (err) {
    console.log('Unexpected error in patching community ', err);
    return res.status(500).send({ error: 'an error occurred' });
>>>>>>> ce84c7f6f61f615fdfe6879b09384832047481c6
  }
});

module.exports = router;
