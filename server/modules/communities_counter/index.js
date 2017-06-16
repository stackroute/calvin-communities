const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const controller = require('./counter.router');

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((res, req, next) => {
  next();
});
app.listen(PORT, () => {
  console.log('basics! on port', PORT);
});


app.use('/', controller);

module.exports = app;

