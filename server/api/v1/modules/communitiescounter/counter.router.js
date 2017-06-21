const router = require('express').Router();

const counterCtrl = require('./counter.controller');

/*
 * Effective URI of the API is GET /counter/:domainname
 *
 * API for getting community status(count) of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get the counter incresed
 *
 */
router.get('/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    counterCtrl.getcounter(domain, (err, results) => {
      if (err) {
        console.log('error in getting the count for the pacticular domain', err);
        return res.status(500).send({ error: 'error in operation,please try later ...!' });
      }
      return res.send(results);
    });
  } catch (err) {
    console.log('Unexpected error in returning the count values', err);
    res.status(500).send({ error: 'unexpected error occured, please try again ...!' });
  }
  return null;
});

router.patch('/increment/member/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    counterCtrl.incrementmember(domain, (err) => {
      if (err) {
        console.log('error in getting the count for the pacticular domain', err);
        return res.status(500).send({ error: 'error in operation,please try later ...!' });
      }
      return res.status(201).send('member increased');
    });
  } catch (err) {
    console.log('Unexpected error in returning the count values', err);
    res.status(500).send({ error: 'unexpected error occured, please try again ...!' });
  }
  return null;
});

router.patch('/increment/invitation/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    counterCtrl.incrementinvitation(domain, (err) => {
      if (err) {
        console.log('error in getting the count for the pacticular domain', err);
        return res.status(500).send({ error: 'error in operation,please try later ...!' });
      }
      return res.status(201).send('invite increased');
    });
  } catch (err) {
    console.log('Unexpected error in returning the count values', err);
    res.status(500).send({ error: 'unexpected error occured, please try again ...!' });
  }
  return null;
});

router.patch('/increment/tool/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    counterCtrl.incrementtools(domain, (err) => {
      if (err) {
        console.log('error in getting the count for the pacticular domain', err);
        return res.status(500).send({ error: 'error in operation,please try later ...!' });
      }
      return res.status(201).send('tool increased');
    });
  } catch (err) {
    console.log('Unexpected error in returning the count values', err);
    res.status(500).send({ error: 'unexpected error occured, please try again ...!' });
  }
  return null;
});

router.patch('/increment/requests/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    counterCtrl.incrementrequests(domain, (err) => {
      if (err) {
        console.log('error in getting the count for the pacticular domain', err);
        return res.status(500).send({ error: 'error in operation,please try later ...!' });
      }
      return res.status(201).send('requests increased');
    });
  } catch (err) {
    console.log('Unexpected error in returning the count values', err);
    res.status(500).send({ error: 'unexpected error occured, please try again ...!' });
  }
  return null;
});

router.patch('/decrement/member/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    counterCtrl.decrementmember(domain, (err) => {
      if (err) {
        console.log('error in getting the count for the pacticular domain', err);
        return res.status(500).send({ error: 'error in operation,please try later ...!' });
      }
      return res.status(201).send('member decreased');
    });
  } catch (err) {
    console.log('Unexpected error in returning the count values', err);
    res.status(500).send({ error: 'unexpected error occured, please try again ...!' });
  }
  return null;
});

router.patch('/decrement/tool/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    counterCtrl.decrementtools(domain, (err) => {
      if (err) {
        console.log('error in getting the count for the pacticular domain', err);
        return res.status(500).send({ error: 'error in operation,please try later ...!' });
      }
      return res.status(201).send('tools decreased');
    });
  } catch (err) {
    console.log('Unexpected error in returning the count values', err);
    res.status(500).send({ error: 'unexpected error occured, please try again ...!' });
  }
  return null;
});

router.patch('/decrement/invitation/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    counterCtrl.decrementinvitation(domain, (err) => {
      if (err) {
        console.log('error in getting the count for the pacticular domain', err);
        return res.status(500).send({ error: 'error in operation,please try later ...!' });
      }
      return res.status(201).send('invitation decreased');
    });
  } catch (err) {
    console.log('Unexpected error in returning the count values', err);
    res.status(500).send({ error: 'unexpected error occured, please try again ...!' });
  }
  return null;
});

router.patch('/decrement/requests/:domain', (req, res) => {
  try {
    const domain = req.params.domain;
    counterCtrl.decrementrequests(domain, (err) => {
      if (err) {
        console.log('error in getting the count for the pacticular domain', err);
        return res.status(500).send({ error: 'error in operation,please try later ...!' });
      }
      return res.status(201).send('requests decreased');
    });
  } catch (err) {
    console.log('Unexpected error in returning the count values', err);
    res.status(500).send({ error: 'unexpected error occured, please try again ...!' });
  }
  return null;
});

module.exports = router;
