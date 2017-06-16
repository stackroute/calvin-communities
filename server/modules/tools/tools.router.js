/* ---------------------ROUTER----------------------*/


const express = require('express');

const controller = require('./tools.controller');

const router = express.Router();

// Router methods

router.get('/', (req, res) => {
     try {
   return controller.getTools(req,res);
  } catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.post('/',(req, res) => { 
    try {
   return controller.postTools(req,res);
}
catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.patch('/:domain/:tool',(req, res) => {
    try {
   return controller.modifyTool(req,res);
}
catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }    
});

router.delete('/:domain', (req,res)=> { 
    try {
   return res.send(controller.deleteTool(req,res));
}
catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }  
});

router.delete('/action/:domain/:tool/:name', (req,res)=> {
    try {
   return res.send(controller.deleteAction(req,res));
}
catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }  
});

router.delete('/event/:domain/:tool/:name', (req,res)=> {
    try {
   return res.send(controller.deleteEvent(req,res));
}
catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }  
});


module.exports = router;
