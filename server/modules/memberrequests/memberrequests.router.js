const router = require('express').Router();

const controller = require('./memberrequests.controller');

/*
 * Effective URI of the API is GET /memberrequests/:id
 *
 * API for returning all lists of a specified id
 *
 * URL Parameter
 *  - Id: specify a specific id, to get all its lists
 *
 */

router.get('/:id', function(req, res) {
  try {
        id =  req.params.id;
        controller.gettingValuesById(id, (err , results) => {
        if(err) {
          console.log("Error in controller.gettingValuesById error: ", err);
          return res.status(500).send({error: "Error in operation, please try later..!"});
			}

      	res.send(results);
		});
  } catch (err) {
		console.log("Unexpected error in fetching list for particular id ", err);
		res.status(500).send({error: "Unexpected error occurred, please try again...!"});
	}
  
});


/*
 * Effective URI of the API is POST /memberrequests/send
 *
 * API for inserting the username and domain name if invite or request occured
 *
 */

router.post('/send', function(req, res){
  try {
      values = req.body
      controller.InsertData(values, (err) => {
      if(err) {
          console.log("Error in controller.gettingValuesById error: ", err);
          return res.status(500).send({error: "Error in operation, please try later..!"});
      }
      res.send("inserted")
      });
  } catch (err) {
		console.log("Unexpected error in inserting values ", err);
		res.status(500).send({error: "Unexpected error occurred, please try again...!"});
	}
});

/*
// calling a method for updating the status

router.patch('/action/:id', (req, res) => {
  try {
    return controller.updateInvitation(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// calling a method for rejecting the status

router.delete('/rejected/:id', (req, res) => {
  try {
    return controller.rejectedInviteRequest(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// calling the method for getting all values from the table

router.get('/lists', (req, res) => {
  try {
    return controller.gettingMembers(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// calling the method for getting the values for the particular id


router.get('/:id', (req, res) => {
  try {
    return controller.gettingMembersById(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

*/


module.exports = router;
