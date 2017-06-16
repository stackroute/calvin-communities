
const service = require('./communityrole.service');

function getcommunityrole(req, res) {
  try {
    service.getcommunityrole((err, result) => {
<<<<<<< HEAD
      if (err)		{
        res.status(404).send(err);
        return;
      }


      console.log(result.rows);
=======
      if (err) {
        res.status(404).send(err);
        return;
      }
>>>>>>> 60e33ce9287318cf582e76d4826c39be61b4b227
      res.send(result.rows);
    });
  } catch (err) {
    res.send({ error: 'Unexpected error from GET' });
  }
}

function postcommunityrole(req, res) {
  try {
    if (req.body.domain) {
      if (req.body.role) {
        if (req.body.domain !== null && req.body.role !== null) {
          service.postcommunityrole(req.body, (err) => {
<<<<<<< HEAD
            if (err)					{
=======
            if (err) {
>>>>>>> 60e33ce9287318cf582e76d4826c39be61b4b227
              res.status(404).send(err);
              return;
            }

            res.status(201).send('post added');
          });
<<<<<<< HEAD
        }			else {
          res.send('Please don`t send null values');
        }
      }		else		{
        res.send('role value was passed as null');
      }
    }	else	{
      res.send('domain was passed as null');
    }
  } catch (err) {
    res.send({ error: 'Unexpected error from POST' });
  }
}

function patchcommunityrole(req, res) {
  try {
    service.patchcommunityrole(req.body, req.params, (err) => {
      if (err)		{
=======
        } else {
          res.send('Please don`t send null values');
        }
      } else {
        res.send('role value was passed as null');
      }
    } else {

      res.send('domain was passed as null');
    }
  } catch (err) {
    res.send({ error: 'Unexpected error from POST' });
  }
}

function patchcommunityrole(req, res) {
  try {
    service.patchcommunityrole(req.body, req.params, (err) => {
<<<<<<< HEAD
      if (err) {
>>>>>>> 60e33ce9287318cf582e76d4826c39be61b4b227
        res.status(404).send(err);
        return;
      }

      res.status(201).send('patch done');
    });
  } catch (err) {
    res.send({ error: 'Unexpected error from Patch' });
  }
}

module.exports = {
  getcommunityrole,
  postcommunityrole,
  patchcommunityrole,
};
