/* ---------------------ROUTER----------------------*/


const router = require('express').Router();

const ToolCtrl = require('./tools.controller');

/*
 * Effective URI of the API is GET /api/tools/:domainname
 *
 * API for returning all tools of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its tools
 *
 */

router.get('/:domainname', (req, res) => {
    try {
        const domainName = req.params.domainname;
        // console.log('get method');
        ToolCtrl.getTools(domainName, (err, results) => {
            if (err) {
                // console.log('Error in ToolCtrl.getTools error: ', err);
                return res.status(500).send(err);
            }

            return res.send(results);
        });
    } catch (err) {
        // console.log('Unexpected error in fetching community tools ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
    return null;
});

router.post('/', (req, res) => {
    try {
        const dataFromBody = req.body;
        ToolCtrl.postTools(dataFromBody, (err, results) => {
            if (err) {
                // console.log('Error in ToolCtrl.postTools error: ', err);
                return res.status(404).send(err);
            }

            return res.status(402).send(results);
        });
    } catch (err) {
        // console.log('Unexpected error in fetching community tools ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
    return null;
});

router.patch('/:domain/', (req, res) => {
    try {
        const dataFromBody = req.body;
        const dataFromParams = req.params;
        ToolCtrl.modifyTool(dataFromBody, dataFromParams, (err) => {
            if (err) {
                // console.log('Error in ToolCtrl.postTools error: ', err);
                return res.status(500).send({ error: 'Error in operation, please try later..!' });
            }

            return res.send({ message: 'Tool modified' });
        });
    } catch (err) {
        // console.log('Unexpected error in fetching community tools ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
    return null;
});

router.delete('/:domain/:tool', (req, res) => {
    try {
        const dataFromParams = req.params;
        ToolCtrl.deleteTool(dataFromParams, (err) => {
            if (err) {
                // console.log('Error in ToolCtrl.postTools error: ', err);
                return res.status(500).send({ error: 'Error in operation, please try later..!' });
            }

            return res.send({ message: 'deleted' });
        });
    } catch (err) {
        // console.log('Unexpected error in fetching community tools ', err);
        return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
    }
    return null;
});

// router.delete('/action/:domain/:tool/:name', (req, res) => {
//     try {
//         const dataFromParams = req.params;
//         ToolCtrl.deleteAction(dataFromParams, (err, results) => {
//             if (err) {
//                 console.log('Error in ToolCtrl.postTools error: ', err);
//                 return res.status(500).send({ error: 'Error in operation' });
//             }

//             return res.send('Deleted Actions');
//         });
//     } catch (err) {
//         console.log('Unexpected error in fetching community tools ', err);
//         return res.status(500).send({ error: 'Unexpected error occurred,' });
//     }
// });

// router.delete('/event/:domain/:tool/:name', (req, res) => {
//     try {
//         const dataFromParams = req.params;
//         ToolCtrl.deleteEvent(dataFromParams, (err, results) => {
//             if (err) {
//                 console.log('Error in ToolCtrl.postTools error: ', err);
//                 return res.status(500).send({ error: 'Error in operation' });
//             }

//             return res.send('Deleted Actions');
//         });
//     } catch (err) {
//         console.log('Unexpected error in fetching community tools ', err);
//         return res.status(500).send({ error: 'Unexpected error occurred' });
//     }
// });


module.exports = router;
