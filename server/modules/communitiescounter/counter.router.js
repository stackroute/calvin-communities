const router = require('express').Router();

const counterCtrl = require('./counter.controller');

/*
 * Effective URI of the API is GET /counter/:domainname
 *
 * API for getting community stats(count) of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get the counter incresed
 *
 */
router.get('/:domain', function(req, res) {
  try {
    let domain = req.params.domain;
    counterCtrl.getcounter(domain, (err, results) => {
      if (err) {
        console.log("error in getting the count for the pacticular domain", err);
        return res.status(500).send({ error: "error in operation,please try later ...!" });
      }
      res.send(results);
    });
  } catch (err) {
    console.log("Unexpected error in returning the count values", err);
    res.status(500).send({ error: "unexpected error occured, please try again ...!" });
  }
});

router.patch('/increment/member/:domain', function(req, res) {
  try {
    let domain = req.params.domain;
    counterCtrl.incrementmember(domain, (err, results) => {
      if (err) {
        console.log("error in getting the count for the pacticular domain", err);
        return res.status(500).send({ error: "error in operation,please try later ...!" });
      }
      res.status(201).send('member increased');
    });
  } catch (err) {
    console.log("Unexpected error in returning the count values", err);
    res.status(500).send({ error: "unexpected error occured, please try again ...!" });
  }
});

router.patch('/increment/invitation/:domain', function(req, res) {
  try {
    let domain = req.params.domain;
    counterCtrl.incrementinvitation(domain, (err, results) => {
      if (err) {
        console.log("error in getting the count for the pacticular domain", err);
        return res.status(500).send({ error: "error in operation,please try later ...!" });
      }
      res.status(201).send('invite increased');
    });
  } catch (err) {
    console.log("Unexpected error in returning the count values", err);
    res.status(500).send({ error: "unexpected error occured, please try again ...!" });
  }
});

router.patch('/increment/tool/:domain', function(req, res) {
  try {
    let domain = req.params.domain;
    counterCtrl.incrementtools(domain, (err, results) => {
      if (err) {
        console.log("error in getting the count for the pacticular domain", err);
        return res.status(500).send({ error: "error in operation,please try later ...!" });
      }
      res.status(201).send('tool increased');
    });
  } catch (err) {
    console.log("Unexpected error in returning the count values", err);
    res.status(500).send({ error: "unexpected error occured, please try again ...!" });
  }
});

router.patch('/increment/requests/:domain', function(req, res) {
  try {
    let domain = req.params.domain;
    counterCtrl.incrementrequests(domain, (err, results) => {
      if (err) {
        console.log("error in getting the count for the pacticular domain", err);
        return res.status(500).send({ error: "error in operation,please try later ...!" });
      }
      res.status(201).send('requests increased');
    });
  } catch (err) {
    console.log("Unexpected error in returning the count values", err);
    res.status(500).send({ error: "unexpected error occured, please try again ...!" });
  }
});

router.patch('/decrement/member/:domain', function(req, res) {
  try {
    let domain = req.params.domain;
    counterCtrl.decrementmember(domain, (err, results) => {
      if (err) {
        console.log("error in getting the count for the pacticular domain", err);
        return res.status(500).send({ error: "error in operation,please try later ...!" });
      }
      res.status(201).send('member decreased');
    });
  } catch (err) {
    console.log("Unexpected error in returning the count values", err);
    res.status(500).send({ error: "unexpected error occured, please try again ...!" });
  }
});

router.patch('/decrement/tool/:domain', function(req, res) {
  try {
    let domain = req.params.domain;
    counterCtrl.decrementtools(domain, (err, results) => {
      if (err) {
        console.log("error in getting the count for the pacticular domain", err);
        return res.status(500).send({ error: "error in operation,please try later ...!" });
      }
      res.status(201).send('tools decreased');
    });
  } catch (err) {
    console.log("Unexpected error in returning the count values", err);
    res.status(500).send({ error: "unexpected error occured, please try again ...!" });
  }
});

router.patch('/decrement/invitation/:domain', function(req, res) {
  try {
    let domain = req.params.domain;
    counterCtrl.decrementinvitation(domain, (err, results) => {
      if (err) {
        console.log("error in getting the count for the pacticular domain", err);
        return res.status(500).send({ error: "error in operation,please try later ...!" });
      }
      res.status(201).send('invitation decreased');
    });
  } catch (err) {
    console.log("Unexpected error in returning the count values", err);
    res.status(500).send({ error: "unexpected error occured, please try again ...!" });
  }
});

router.patch('/decrement/requests/:domain', function(req, res) {
  try {
    let domain = req.params.domain;
    counterCtrl.decrementrequests(domain, (err, results) => {
      if (err) {
        console.log("error in getting the count for the pacticular domain", err);
        return res.status(500).send({ error: "error in operation,please try later ...!" });
      }
      res.status(201).send('requests decreased');
    });
  } catch (err) {
    console.log("Unexpected error in returning the count values", err);
    res.status(500).send({ error: "unexpected error occured, please try again ...!" });
  }
});

module.exports = router;
