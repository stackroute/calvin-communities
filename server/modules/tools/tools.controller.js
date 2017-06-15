
/* ---------------------CONTROLLER----------------------*/

const service = require('./tools.services'); //

// Function for Getting tools

function getTools(req, res) {
  try {
    service.getTools((err, result) => {
      if (err) {
        console.log('error occured', err);
      }
      console.log(result.rows);
      res.status(200).send(result.rows);
    });
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
}

// Function for Posting tools

function postTools(req, res) {
  try {
    if (req.body.domain) {
      if (req.body.id) {
        if (req.body.domain !== null && req.body.id !== null) {
          service.addTools(req.body, (err) => {
            if (err) {
              console.log('error occured', err);
            }
            console.log('new tool added');
            res.status(201).send('new tool added');
          });
        } else {
          res.status(404).send('NULL value entered!!');
        }
      } else {
        res.status(404).send('please fill out all fields!!');
      }
    } else {
      res.status(404).send('please fill out all fields!!');
    }
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
}

// To add actions and activity events to existing tools

function modifyTool(req, res) {
  try {
    service.updateTools(req.body, req.params, (err) => {
      if (err) {
        console.log('error occured', err);
      }
      console.log('tool updated');
      res.status(201).send('tool updated');
    });
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
}

// To delete an action from a tool

function deleteAction(req, res) {
  try {
    service.deleteAction(req.params, (err) => {
      if (err) {
        console.log('error occured', err);
      }
      console.log('action deleted');
      res.status(201).send('action deleted');
    });
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
}

// To delete an event from a tool

function deleteEvent(req, res) {
  try {
    service.deleteEvent(req.params, (err) => {
      if (err) {
        console.log('error occured', err);
      }
      console.log('event deleted');
      res.status(201).send('event deleted');
    });
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
}

// To delete a tool

function deleteTool(req, res) {
  try {
    service.deleteTool(req.params, (err) => {
      if (err) {
        console.log('error occured', err);
      }
      console.log('tool deleted');
      res.status(201).send('tool deleted');
    });
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
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
