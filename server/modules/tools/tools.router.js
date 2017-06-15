/* ---------------------ROUTER----------------------*/


const express = require('express');

const controller = require('./tools.controller');

const router = express.Router();

// Router methods

router.get('/', controller.getTools);

router.post('/', controller.postTools);

router.patch('/:domain/:tool', controller.modifyTool);

router.delete('/:domain', controller.deleteTool);

router.delete('/action/:domain/:tool/:name', controller.deleteAction);

router.delete('/event/:domain/:tool/:name', controller.deleteEvent);


module.exports = router;
