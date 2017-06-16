const express = require('express');

const controller = require('./member.controller');

const router = express.Router();

router.post('/community/member', (req, res) => {
  try {
    res.send(controller.addMemberToCommunity(req, res));
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/communities/members', (req, res) => {
  try {
    controller.getAllMembersInCommunities(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/communities/member/:username', (req, res) => {
  try {
    controller.getParticularMemberDetailInCommunities(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/member/community/:domain', (req, res) => {
  try {
    controller.getParticularCommunityMemberDetails(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/communities', (req, res) => {
  try {
    controller.getAllCommunity(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});


router.delete('/community/:domain', (req, res) => {
  try {
    controller.deleteParticularCommunity(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});


router.delete('/community/:domain/member/:username', (req, res) => {
  try {
    controller.deleteParticularMemberFromCommunity(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.patch('/community/:domain/member/:username/role', (req, res) => {
  try {
    controller.modifyRoleOfMemberFromCommunity(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

//   next();
// });


// router.post('/member', (req, res) => {
//   try {
//     // res.send(controller.addMember(req, res));
//     console.log(controller.addMember(req, res));
//   } catch (err) {
//     console.log('Error happned in ... ', err);
//     // res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//     console.log({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// });

// router.get('/members', (req, res) => {
//   try {
//     console.log(controller.getMembers(req, res));
//   } catch (err) {
//     console.log('Error happned in ...! ', err);
//     console.log({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// });

// router.get('/member/:username', (req, res) => {
//   try {
//     // res.send(controller.getMember(req, res));
//       console.log(controller.getMember(req, res));
//   } catch (err) {
//     console.log('Error happned in ...! ', err);
//     // res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//     console.log({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// });

// router.patch('/member/:username/community/:domain/role', (req, res) => {
//   try {
//     // res.send(controller.modifyRoleOfMember(req, res));
//     console.log(controller.modifyRoleOfMember(req, res));
//   } catch (err) {
//     console.log('Error happned in ... !', err);
//     // res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//     console.log({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// });

// router.delete('/member/:username', (req, res) => {
//   try {
//     // res.send(controller.deleteMember(req, res));
//     console.log(controller.deleteMember(req, res));
//   } catch (err) {
//     console.log('Error happned in ...! ', err);
//     // res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//     console.log({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// });

// router.delete('/member/:username', (req, res) => {
//   try {
//     controller.deleteMemberDetail(req, res);
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// });

// router.delete('/member/:username', (req, res) => {
//   try {
//     controller.deleteMember(req, res);
//   } catch (err) {
//     res.send({ error: 'Unexpected internal error occurred, please try later...!' });
//   }
// });

module.exports = router;
