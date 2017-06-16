
const counterservice = require('./counter.service');

function getcounter(domain,done){
  counterservice.getcounter(domain,done);
}

// function fro getting the counter for the table
// function getcounter(req, res) {
//   try {
//     counterservice.getcounter((err, result) => {
//       if (err) { throw err; }
//       return res.status(200).send(result.rows);
//     });
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// }
// // To increment membersadded
// function incrementmember(req, res) {
//   try {
//     counterservice.incrementmember(req.params, (err) => {
//       if (err) { throw err; }
//       return res.status(201).send(' added');
//     });
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// }
// // to incrementrequests
// function incrementrequests(req, res) {
//   try {
//     counterservice.incrementrequests(req.params, (err) => {
//       if (err) { throw err; }
//       return res.status(201).send(' added');
//     });
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// }
// // to incrementtools
// function incrementtools(req, res) {
//   try {
//     counterservice.incrementtools(req.params, (err) => {
//       if (err) { throw err; }
//       return res.status(201).send(' added');
//     });
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// }
// // to incrementinvitation
// function incrementinvitation(req, res) {
//   try {
//     counterservice.incrementinvitation(req.params, (err) => {
//       if (err) { throw err; }
//       return res.status(201).send(' added');
//     });
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// }
// // to decrementinvitation
// function decrementinvitation(req, res) {
//   try {
//     counterservice.decrementinvitation(req.params, (err) => {
//       if (err) { throw err; }
//       return res.status(201).send(' deleted');
//     });
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// }
// // to decrementmember
// function decrementmember(req, res) {
//   try {
//     counterservice.decrementmember(req.params, (err) => {
//       if (err) { throw err; }
//       return res.status(201).send('deleted');
//     });
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// }
// // to decrementrequests
// function decrementrequests(req, res) {
//   try {
//     counterservice.decrementrequests(req.params, (err) => {
//       if (err) { throw err; }
//       return res.status(201).send('deleted');
//     });
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// }
// // to decrementtools
// function decrementtools(req, res) {
//   try {
//     counterservice.decrementtools(req.params, (err) => {
//       if (err) { throw err; }
//       return res.status(201).send(' deleted');
//     });
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// }
// // exporting functions to the counter
module.exports = {
  // incrementrequests,
  // incrementinvitation,
  getcounter,
  // incrementmember,
  // incrementtools,
  // decrementtools,
  // decrementmember,
  // decrementrequests,
  // decrementinvitation,

};
