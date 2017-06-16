const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const router = require('./member.router');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

app.use('/', router);

module.exports = app;
