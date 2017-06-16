<<<<<<< HEAD
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./communityrole.router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((res, req, next) => {
  next();
});


app.use('/', router);

module.exports = app;
=======
module.exports = require('./communityrole.router');
>>>>>>> 60e33ce9287318cf582e76d4826c39be61b4b227
