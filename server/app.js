const express = require('express');
const path = require('path');

const app = express();

const clientPath = path.resolve(__dirname, '..', 'dist');

app.use(require('body-parser').json());

console.log('Hosting static path ', clientPath);


app.use(express.static(clientPath));

app.get('/hello', (req, res) => res.send({ msg: 'Howdy partner ' }));

app.get('/welcome', (req, res) => {
  res.send({ msg: 'Welcome to app' });
});

app.get('/users', (req, res) => {
  res.send({ msg: 'welcomes users' });
});

// api

app.use('/api/community', require('./modules/community/index'));

app.use('/api/invitation', require('./modules/memberrequests'));

app.use('/api/tools', require('./modules/tools/index'));

app.use('/api/counter',require('./modules/communitiescounter/index'));

app.use('/api', require('./modules/member/index'));// member

app.use('/api/communityrole', require('./modules/communityrole/index'));


app.use((req, res) => {
  res.status(404).send({ error: 'Resource not found' });
});

module.exports = app;
