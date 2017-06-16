const express = require('express');
const path = require('path');

const app = express();

const clientPath = path.resolve(__dirname, '..', 'dist');

app.use(require('body-parser').json());

const community = require('./modules/community/index');
const members = require('./modules/members/index');
const tools = require('./modules/tools/index');
const invitation = require('./modules/memberrequests');
const counter = require('./modules/communities_counter/index');
const communityrole = require('./modules/communityrole/index')

console.log('Hosting static path ', clientPath);

app.use(express.static(clientPath));

app.get('/hello', (req, res) => res.send({ msg: 'Howdy partner ' }));

app.get('/welcome', (req, res) => {
  res.send({ msg: 'Welcome to app' });
});

app.get('/users', (req, res) => {
  res.send({ msg: 'welcomes users' });
});

app.use('/api/community', community );



app.use('/api/invitation',invitation);


app.use('/api/tools', tools);
app.use('/api/counter', counter);
app.use('/api/communityrole', communityrole);

app.use((req, res) => {
  res.status(404).send({ error: 'Resource not found' });
});

module.exports = app;