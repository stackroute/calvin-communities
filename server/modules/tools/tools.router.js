const express = require('express');

const controller = require('./tools.controller');

const router = express.Router();

router.get('/', controller.getTools);

router.post('/', controller.postTools);

router.patch('/:id/:tool', controller.modifyTool);

router.delete('/:id', controller.deleteTool);

router.delete('/action/:id/:tool/:index/', controller.deleteAction);

router.delete('/event/:id/:tool/:index', controller.deleteEvent);


module.exports = router;
