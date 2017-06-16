const express = require('express');
const path = require('path');

const app = express();

const clientPath = path.resolve(__dirname, '..', 'dist');

app.use(require('body-parser').json());

const community = require('./modules/community/index');

const tools = require('./modules/tools/index');
const invitation = require('./modules/memberrequests');
//const counter = require('./modules/communities_counter/index');
const communityrole = require('./modules/communityrole/index');





app.use(express.static(clientPath));


app.use('/api/community', community);


app.use('/api/invitation', require('./modules/memberrequests'));


app.use('/api/tools', tools);
// app.use('/api/counter', require('./modules/communities_counter/index'));

app.use('/api/invitation', invitation);




app.use('/api', require('./modules/member/index'));// member

//app.use('/api/counter',require('./modules/communities_counter/index'));



app.use('/api/communityrole', communityrole);

app.use(express.static(clientPath));

app.use(require('body-parser').json());


app.use('/api/v1', require('./api/v1'));

app.use((req, res) => {
  res.status(404).send({ error: 'Resource not found' });
});

module.exports = app;
