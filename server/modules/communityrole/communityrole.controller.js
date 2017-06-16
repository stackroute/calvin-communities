
const service = require('./communityrole.service');

function getcommunityrole(req, res) {
  try {
    service.getcommunityrole((err, result) => {
<<<<<<< HEAD
      if (err) {
        res.status(404).send(err);
        return;
      }
=======
      if (err)		{
        res.status(404).send(err);
        return;
      }


      console.log(result.rows);
>>>>>>> f4f3d942bbe060f8158b0b8f83ae7fa8890adea5
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
            if (err) {
=======
            if (err)					{
>>>>>>> f4f3d942bbe060f8158b0b8f83ae7fa8890adea5
              res.status(404).send(err);
              return;
            }

            res.status(201).send('post added');
          });
<<<<<<< HEAD
        } else {
          res.send('Please don`t send null values');
        }
      } else {
        res.send('role value was passed as null');
      }
    } else {
=======
        }			else {
          res.send('Please don`t send null values');
        }
      }		else		{
        res.send('role value was passed as null');
      }
    }	else	{
>>>>>>> f4f3d942bbe060f8158b0b8f83ae7fa8890adea5
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
=======
      if (err)		{
>>>>>>> f4f3d942bbe060f8158b0b8f83ae7fa8890adea5
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
