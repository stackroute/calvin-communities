
/* ---------------------CONTROLLER----------------------*/

const communityToolService = require('./tools.services'); //

// Function for Getting tools

function getTools(domainName, done) {
  communityToolService.getTools(domainName, done);

}

// Function for Posting tools

function postTools(dataFromBody,done) {
    if (dataFromBody.domain && dataFromBody.id) {
      if (dataFromBody.domain!==null && dataFromBody.id!=null) {
          communityToolService.addTools(dataFromBody, done); 
      } else {
        return 'please fill out all fields!!';
      }
    } else {
      return 'please fill out all fields!!';
    }
}

// To add actions and activity events to existing tools

function modifyTool(req, res) {
    service.updateTools(req.body, req.params, (err) => {
      if (err) {
        return res.send( "error occured");
      }
      return res.send("Tool Updated");
    });
  }


// To delete an action from a tool

function deleteAction(req, res) {
    service.deleteAction(req.params, (err) => {
      if (err) {
        return "error occured";
      }
      return "action deleted";
    });
  }


// To delete an event from a tool

function deleteEvent(req, res) {
    service.deleteEvent(req.params, (err) => {
      if (err) {
        return "error occured";
      }
      return "event deleted";
    }); 
}

// To delete a tool

function deleteTool(req, res) {
    service.deleteTool(req.params, (err) => {
      if (err) {
        return "error occured";
      }
      return "Tool deleted";
    });

}

// Exporting the functions to be used in router

module.exports = {
  deleteTool,
  modifyTool,
  getTools,
  postTools,
  deleteEvent,
  deleteAction,
};
