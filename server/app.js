const express = require('express');
const path = require('path');

const app = express();

const clientPath = path.resolve(__dirname, '..', 'dist');

app.use(require('body-parser').json());

const community = require('./modules/community/index');
const members = require('./modules/members/index');
const tools = require('./modules/tools/index');
const invite = require('./modules/invite/index');
const members = require('./modules/member/index');

<<<<<<< HEAD


=======
>>>>>>> f30acdcca65e07bcd8406dcbd1d2f5637ac3cb26
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
app.use('/api/invitation',invite);

app.use('/api/tools', tools);
<<<<<<< HEAD
app.use('/api', members);

=======
app.use('/api/counter',require('./modules/communities_counter/index'));
>>>>>>> f30acdcca65e07bcd8406dcbd1d2f5637ac3cb26

app.use((req, res) => {
  res.status(404).send({ error: 'Resource not found' });
});

module.exports = app;
