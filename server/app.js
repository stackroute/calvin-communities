const express = require('express');
const path = require('path');

const app = express();

app.use('/api/v1', require('./api/v1'));

app.use((req, res) => {
  res.status(404).send({ error: 'Resource not found' });
});

module.exports = app;
