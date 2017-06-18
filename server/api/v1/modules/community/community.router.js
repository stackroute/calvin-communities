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
    communityCtrl.getallcommunities((err, results) => {
      if (err) {
        console.log('Error in communityCtrl.allcommunities error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      res.send(results);
    });
  } catch (err) {
    console.log('Unexpected error in fetching communities ', err);
    res.status(500).send({ error: 'Unexpected error occurred, try again later' });
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

        communityCtrl.addcommunity(req.body, (err, results) => {
            if (err) {
                console.log("Error in communityCtrl.postcommunity error: ", err);
                return res.status(500).send({ error: "Error in operation, try again later" });
            }
            res.status(201).send({ message: 'Community created.' });
        })
    } catch (err) {
        console.log("Unexpected error in patching community ", err);
        res.status(500).send({ message: `an error occurred` });
    }
})


/**
 * Get For specific communities,
 * URI is: /api/v1/:domain community
 * GET REQUEST
 *
 *
 */
router.get('/:domain', (req, res) => {
    try {
        communityCtrl.getcommunity(req.params.domain, (err, results) => {
            if (err) {
                console.log("Error in communityCtrl.getcommunity error: ", err);
                return res.status(500).send({ error: "Error in operation, try again later" });
            }
            res.send(results);
        })

    } catch (err) {
        console.log("Unexpected error in fetching communities ", err);
        res.status(500).send({ error: "Unexpected error occurred, try again later" });
    }
})


/**
 * PATCH For specific communities,
 * URI is: /api/v1/ community
 * PATCH REQUEST
 *
 *
 */
router.patch('/:domain', (req, res) => {
    try {
        communityCtrl.updatecommunity(req.params.domain, req.body, (err, results) => {
            if (err) {
                console.log("Error in communityCtrl.updatecommunity error:", err);
                return res.status(500).send({ error: "Error in Operation, try again later" })

            }
            res.status(202).send({ message: "Community Updated" });
        })

    } catch (err) {
        console.log("Unexpected error in patching community ", err);
        res.status(500).send({ error: `an error occurred` });
    }
})

module.exports = router;
