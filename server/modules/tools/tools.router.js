const express = require('express');

const controller = require('./tools.controller');

const router = express.Router();

router.get('/', controller.getTools);

router.post('/', controller.postTools);

router.patch('/:id', controller.modifyTool);

router.delete('/:id', controller.deleteTool);

router.delete('/action/:id/:index', controller.deleteAction);

router.delete('/event/:id/:index', controller.deleteEvent);


module.exports = router;
