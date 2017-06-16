<<<<<<< HEAD
module.exports = require('./communityrole.router');
=======
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
>>>>>>> f4f3d942bbe060f8158b0b8f83ae7fa8890adea5
