const express = require('express');
const path = require('path');

const app = express();

const clientPath = path.resolve(__dirname, '..', 'dist');


const community = require('./modules/community/index');
const members = require('./modules/members/index');
const tools = require('./modules/tools/index');
const invite = require('./modules/invite/index');


const PORT = process.env.PORT || 4000;

console.log('Hosting static path ', clientPath);

app.use(express.static(clientPath));

app.get('/hello', (req, res) => res.send({ msg: 'Howdy partner ' }));

app.get('/welcome', (req, res) => {
  res.send({ msg: 'Welcome to app' });
});

app.get('/users', (req, res) => {
  res.send({ msg: 'welcomes users' });
});

// middleware function
app.use('/community', require('./modules/communityTemplates'));
app.use('/api/community', community );
app.use('/api/invitation',invite);
app.use('/api/tools', tools);

app.use((req, res) => {
  res.status(404).send({ error: 'Resource not found' });
});

app.listen(PORT, () => {
console.log('basics! on port', PORT);

});



module.exports = app;
