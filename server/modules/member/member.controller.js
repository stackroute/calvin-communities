const service = require('./member.service');

function addMemberToCommunity(req, res) {
  if ((req.body.username !== null && req.body.domain !== null && req.body.role !== null)) {
    if (req.body.username && req.body.domain && req.body.role) {
      const params = {
        username: req.body.username,
        domain: req.body.domain,
        role: req.body.role,
      };
      service.addMemberToCommunity(params, (err) => {
        if (err) {
          res.status(404).send(err);
        }
        res.status(201);
      });
      res.status(200).send('Added');
    } else {
      res.status(404).send('please enter All required fields!!');
    }
  } else {
    res.status(404).send('Null value is not allowed');
  }
}

function getAllMembersInCommunities(req, res) {
  const params = {
    username: req.body.username,
    domain: req.body.domain,
    role: req.body.role,
  };
  service.getAllMembersInCommunities(params, (err, data) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(data);
  });
}

function getParticularMemberDetailInCommunities(req, res) {
  if (req.params.username) {
    const params = {
      username: req.params.username,
    };
    service.getParticularMemberDetailInCommunities(params, (err, data) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).send(data);
    });
  } else {
    res.status(404).send('Null value is not allowed');
  }
}

function getParticularCommunityMemberDetails(req, res) {
  if (req.params.domain) {
    const params = {
      domain: req.params.domain,
    };
    service.getParticularCommunityMemberDetails(params, (err, data) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).send(data.rows);
    });
  } else {
    res.status(404).send('Null value is not allowed');
  }
}

function getAllCommunity(req, res) {
  const params = {
    username: req.body.username,
    domain: req.body.domain,
    role: req.body.role,
  };
  service.getAllCommunity(params, (err, data) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(data);
  });
}


function deleteParticularCommunity(req, res) {
  if (req.params.domain) {
    const params = {
      domain: req.params.domain,
    };
    service.deleteParticularCommunity(params, (err) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(202).send('Deleted');
    });
  } else {
    res.status(404).send('Domain should not be empty !!');
  }
}

function deleteParticularMemberFromCommunity(req, res) {
  if (req.params.domain && req.params.username) {
    const params = {
      domain: req.params.domain,
      username: req.params.username,
    };
    service.deleteParticularMemberFromCommunity(params, (err) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(202).send('Deleted');
    });
  } else {
    res.status(404).send('Domain should not be empty !!');
  }
}

function modifyRoleOfMemberFromCommunity(req, res) {
  if (req.params.username && req.params.domain) {
    const params = {
      username: req.params.username,
      domain: req.params.domain,
      role: req.body.role,
    };
    service.modifyRoleOfMemberFromCommunity(params, (err) => {
      if (err) {
        res.status(404).send(err); 
      }
      res.status(202).send('Updated');
    });
  } else {
    res.status(204).send('username and domain should not be empty');
  }
}



// const params = {
//   username: req.params.username,
//   domain: req.params.domain,
//   role: req.body.role,
// };
// service.modify(params, (err) => {
//   res.status(201);
//   if (err){
//     res.status(404).send(err);
//   }
// });


// function modifyRoleOfMember(req, res) {
//   if(req.params.username){
//     if(req.params.domain){
//       if(req.params)
//     }
//   }
// }
//   // const params = {
//   //   username: req.params.username,
//   //   domain: req.params.domain,
//   //   role: req.body.role,
//   // };
//   // service.modify(params, (err) => {
//   //   res.status(201);
//   //   if (err){
//   //     res.status(404).send(err);
//   //   }
//   // });


// function deleteMember(req, res) {
//   if (req.params.username) {
//     const params = {
//       username: req.params.username,
//     };
//     service.deleteMemberDetail(params, (err, data) => {
//       if (err) {
//         res.status(404).send(err);
//       }
//       res.status(202).send('Deleted');
//     });
//   } else {
//     res.status(404).send('username should not be empty!!');
//   }
// }
// function deleteMemberDetail(req, res) {
//   if (req.params.username) {
//     const params = {
//       username: req.params.username,
//     };
//     service.deleteMemberDetail(params, (err) => {
//       if (err) {
//         res.status(404).send(err);
//       }
//       res.status(202).send('Deleted');
//     });
//   } else {
//     res.status(404).send('username should not be empty !!');
//   }
// }


module.exports = {
  addMemberToCommunity,
  getAllMembersInCommunities,
  getParticularMemberDetailInCommunities,
  getParticularCommunityMemberDetails,
  getAllCommunity,
  deleteParticularCommunity,
  deleteParticularMemberFromCommunity,
  modifyRoleOfMemberFromCommunity,
 // deleteMemberDetail,
  // deleteMember,
};
