
const emptyBodyError = { error: 'Body data cannot be empty' };

const emptyDataValueError = { error: 'Value of username and role cannot be empty' };

const errorAddingMember = { error: 'Member detail already exist' };

const successAddedMember = { message: 'Member added' };

const successDeletedMember = { message: 'Member deleted' };

const noDataExist = { error: 'Member details not available' };

const nodomainExist = { error: 'please enter a valid domain' };

const successAddCommunityRoles = {};

const noRoleInDomain = { error: 'Given role is not available for this community' };

const successUpdatedMembers = { message: 'Role modified' };

const resourceError = { error: 'Resource not found' };

const dataExist = { error: 'Same data Exist' };

const dataNotExist = { error: 'Data not exist' };

const emptyBody = [];

const emptyData = [{
  username: '',
  role: '',
}];
const emptyUsername = [{
  username: '',
  role: 'Digital-Developer',
}];

const noUsername = [{
  role: 'Digital-Developer',
}];

const emptyRole = [{
  username: 'Aravindh',
  role: '',
}];

const noRole = [{
  username: 'Aravindh',
}];

const addMembers = [
  {
    username: 'Aravindh',
    role: 'Digital-Developer',
  },
  {
    username: 'Keerthi',
    role: 'Digital-Developer',
  },
  {
    username: 'Aswini',
    role: 'Digital-Developer',
  },
  {
    username: 'Suresh',
    role: 'Digital-Developer',
  },
  {
    username: 'Ashok',
    role: 'Digital-Developer',
  },
  {
    username: 'Karthikeyan',
    role: 'Digital-Manager',
  },
  {
    username: 'AnithaJaganathan',
    role: 'Digital-Retainer',
  },
  {
    username: 'Sagar',
    role: 'Digital-Mentor',
  },
  {
    username: 'Basavaraj',
    role: 'Digital-Mentor',
  },
  {
    username: 'Simantha',
    role: 'Digital-Mentor',
  },
  {
    username: 'Nelanjan',
    role: 'Digital-Mentor',
  },
  {
    username: 'Himani',
    role: 'Digital-Mentor',
  },
];


const addCommunityRoles = [
  {
    role: 'Digital-Developer',
    actions: {
      post: 'post',
      guest: 'true',
    },
    toolId: 'git',

  },
  {
    role: 'Digital-Manager',
    actions: {
      post: 'false',
      like: 'true',
    },
    toolId: 'quora',

  },
  {
    role: 'Digital-Retainer',
    actions: {
      post: 'post',
      guest: 'true',
    },
    toolId: 'insta',

  },
  {
    role: 'Digital-Mentor',
    actions: {
      post: 'false',
      like: 'true',
    },
    toolId: 'forum',

  },
  {
    role: 'Developer',
    actions: {
      post: 'post',
      guest: 'true',
    },
    toolId: 'git',

  },
  {
    role: 'Manager',
    actions: {
      post: 'false',
      like: 'true',
    },
    toolId: 'quora',

  },
  {
    role: 'Retainer',
    actions: {
      post: 'post',
      guest: 'true',
    },
    toolId: 'insta',

  },
  {
    role: 'Mentor',
    actions: {
      post: 'false',
      like: 'true',
    },
    toolId: 'forum',

  },

];

const noRoleExist = [
  {
    username: 'Aravindh',
    role: 'dancer',
  },
  {
    username: 'Keerthi',
    role: 'singer',
  },
  {
    username: 'Aswini',
    role: 'Developer',
  },
  {
    username: 'Suresh',
    role: 'player',
  },
];

const updateMembers = [
  {
    username: 'Aravindh',
    role: 'Developer',
  },
  {
    username: 'Keerthi',
    role: 'Developer',
  },
  {
    username: 'Aswini',
    role: 'Developer',
  },
  {
    username: 'Suresh',
    role: 'Developer',
  },
  {
    username: 'Ashok',
    role: 'Developer',
  },
  {
    username: 'Karthikeyan',
    role: 'Manager',
  },
  {
    username: 'AnithaJaganathan',
    role: 'Retainer',
  },
  {
    username: 'Sagar',
    role: 'Mentor',
  },
  {
    username: 'Basavaraj',
    role: 'Mentor',
  },
  {
    username: 'Simantha',
    role: 'Mentor',
  },
  {
    username: 'Nelanjan',
    role: 'Mentor',
  },
  {
    username: 'Himani',
    role: 'Mentor',
  },
];

const addCommunityRolesForSerive = [
  {
    role: 'trainee-fullStack-developer',
    actions: {
      post: 'post',
      guest: 'true',
    },
    toolId: 'git',

  },
  {
    role: 'trainee-fullStack',
    actions: {
      post: 'false',
      like: 'true',
    },
    toolId: 'quora',

  },
];

const updateNotAvailableMembers = [
  {
    username: 'Aravindh',
    role: 'Digital-Developer',
  },
  {
    username: 'Sithar',
    role: 'Developer',
  }];


module.exports = {
  emptyBodyError,
  emptyDataValueError,
  errorAddingMember,
  successAddedMember,
  emptyBody,
  emptyData,
  emptyUsername,
  noUsername,
  emptyRole,
  noRole,
  addMembers,
  successDeletedMember,
  noDataExist,
  nodomainExist,
  addCommunityRoles,
  successAddCommunityRoles,
  updateMembers,
  noRoleInDomain,
  noRoleExist,
  successUpdatedMembers,
  resourceError,
  dataExist,
  updateNotAvailableMembers,
  dataNotExist,
  addCommunityRolesForSerive,
};
