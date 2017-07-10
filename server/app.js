const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const clientPath = path.resolve(__dirname, '..', 'dist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(clientPath));

process.stdout.write("Initializing Calvin Communities database");
const dbsetup = require('./dbcreation');
dbsetup.dbCreate();

function welcome() {
  let motdFile = path.resolve(__dirname, '.webapp.motd');
  const fs = require('fs');
  if (fs.existsSync(motdFile)) {
    let msg = fs.readFileSync(motdFile, 'utf-8');
    process.stdout.write('\n' + msg + '\n');
  } else {
    process.stdout.write('\n=========== Calvin WWW ===========\n');
  }
}
welcome();

// middleware function
app.use('/api/v1', require('./api/v1/'));

app.use((req, res) => {
  res.status(404).send({ error: 'Resource not found' });
});

module.exports = app;
