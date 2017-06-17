/* ---------------------ROUTER----------------------*/


const router = require('express').Router();

const communityToolCtrl = require('./communitytools.controller');

/*
 * Effective URI of the API is GET /api/tools/:domainname
 *
 * API for returning all roles of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its roles
 *
 */

router.get('/:domainname', (req, res) => {
    try {
        const domainName = req.params.domainname;
        communityToolCtrl.getTools(domainName, (err, results) => {
            if (err) {
                console.log('Error in communityToolCtrl.getTools error: ', err);
                return res.status(500).send({ error: 'Error in operation, please try later..!' });
            }

            return res.send(results);
        });
    } catch (err) {
        console.log('Unexpected error in fetching community roles ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
});

router.post('/', (req, res) => {
    try {
        const dataFromBody = req.body;
        console.log(dataFromBody);
        communityToolCtrl.postTools(dataFromBody, (err, results) => {
            if (err) {
                console.log('Error in communityToolCtrl.postTools error: ', err);
                return res.status(500).send({ error: 'Error in operation, please try later..!' });
            }

            return res.send(results);
        });
    } catch (err) {
        console.log('Unexpected error in fetching community roles ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
});

router.patch('/:domain/:tool', (req, res) => {
    try {
        const dataFromBody = req.body;
        const dataFromParams = req.params;
        communityToolCtrl.modifyTool(dataFromBody, dataFromParams, (err, results) => {
            if (err) {
                console.log('Error in communityToolCtrl.postTools error: ', err);
                return res.status(500).send({ error: 'Error in operation, please try later..!' });
            }

            return res.send('Updated');
        });
    } catch (err) {
        console.log('Unexpected error in fetching community roles ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
});

router.delete('/:domain', (req, res) => {
    try {
        const dataFromParams = req.params;
        communityToolCtrl.deleteTool(dataFromParams, (err, results) => {
            if (err) {
                console.log('Error in communityToolCtrl.postTools error: ', err);
                return res.status(500).send({ error: 'Error in operation, please try later..!' });
            }

            return res.send('Deleted');
        });
    } catch (err) {
        console.log('Unexpected error in fetching community roles ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
});

router.delete('/action/:domain/:tool/:name', (req, res) => {
    try {
        const dataFromParams = req.params;
        communityToolCtrl.deleteAction(dataFromParams, (err, results) => {
            if (err) {
                console.log('Error in communityToolCtrl.postTools error: ', err);
                return res.status(500).send({ error: 'Error in operation, please try later..!' });
            }

            return res.send('Deleted Actions');
        });
    } catch (err) {
        console.log('Unexpected error in fetching community roles ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
});

router.delete('/event/:domain/:tool/:name', (req, res) => {
    try {
        const dataFromParams = req.params;
        communityToolCtrl.deleteEvent(dataFromParams, (err, results) => {
            if (err) {
                console.log('Error in communityToolCtrl.postTools error: ', err);
                return res.status(500).send({ error: 'Error in operation, please try later..!' });
            }

            return res.send('Deleted Actions');
        });
    } catch (err) {
        console.log('Unexpected error in fetching community roles ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
});


module.exports = router;
