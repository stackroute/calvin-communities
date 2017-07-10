const emptyBodyError = { error: 'Body data cannot be empty' };

const emptyDataValueError = { error: 'Value of username and role cannot be empty' };

const emptyUserValueError = { error: 'Value of username cannot be empty' };

const errorAddingMember = { error: 'Member detail already exist' };

const successAddedMember = { message: 'Member added' };

const successDeletedMember = { message: 'Member deleted' };

const noDataExist = { error: 'Member details not available' };

const nodomainExist = { error: 'please enter a valid domain' };

const successAddCommunityRoles = {};

const noRoleInDomain = { error: 'Specified role is not available for this community' };

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
  role: 'digital-developer',
}];

const noUsername = [{
  role: 'digital-developer',
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
    role: 'digital-developer',
  },
  {
    username: 'Keerthi',
    role: 'digital-developer',
  },
  {
    username: 'Aswini',
    role: 'digital-developer',
  },
  {
    username: 'Suresh',
    role: 'digital-developer',
  },
  {
    username: 'Ashok',
    role: 'digital-developer',
  },
  {
    username: 'Karthikeyan',
    role: 'digital-manager',
  },
  {
    username: 'AnithaJaganathan',
    role: 'digital-retainer',
  },
  {
    username: 'Sagar',
    role: 'digital-mentor',
  },
  {
    username: 'Basavaraj',
    role: 'digital-mentor',
  },
  {
    username: 'Simantha',
    role: 'digital-mentor',
  },
  {
    username: 'Nelanjan',
    role: 'digital-mentor',
  },
  {
    username: 'Himani',
    role: 'digital-mentor',
  },
];


const addCommunityRoles = [
  {
    role: 'digital-developer',
    actions: {
      post: 'post',
      guest: 'true',
    },
    toolId: 'git',

  },
  {
    role: 'digital-manager',
    actions: {
      post: 'false',
      like: 'true',
    },
    toolId: 'quora',

  },
  {
    role: 'digital-retainer',
    actions: {
      post: 'post',
      guest: 'true',
    },
    toolId: 'insta',

  },
  {
    role: 'digital-mentor',
    actions: {
      post: 'false',
      like: 'true',
    },
    toolId: 'forum',

  },
  {
    role: 'developer',
    actions: {
      post: 'post',
      guest: 'true',
    },
    toolId: 'git',

  },
  {
    role: 'manager',
    actions: {
      post: 'false',
      like: 'true',
    },
    toolId: 'quora',

  },
  {
    role: 'retainer',
    actions: {
      post: 'post',
      guest: 'true',
    },
    toolId: 'insta',

  },
  {
    role: 'mentor',
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
    role: 'developer',
  },
  {
    username: 'Suresh',
    role: 'player',
  },
];

const updateMembers = [
  {
    username: 'Aravindh',
    role: 'developer',
  },
  {
    username: 'Keerthi',
    role: 'developer',
  },
  {
    username: 'Aswini',
    role: 'developer',
  },
  {
    username: 'Suresh',
    role: 'developer',
  },
  {
    username: 'Ashok',
    role: 'developer',
  },
  {
    username: 'Karthikeyan',
    role: 'manager',
  },
  {
    username: 'AnithaJaganathan',
    role: 'retainer',
  },
  {
    username: 'Sagar',
    role: 'mentor',
  },
  {
    username: 'Basavaraj',
    role: 'mentor',
  },
  {
    username: 'Simantha',
    role: 'mentor',
  },
  {
    username: 'Nelanjan',
    role: 'mentor',
  },
  {
    username: 'Himani',
    role: 'mentor',
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
    role: 'digital-developer',
  },
  {
    username: 'Sithar',
    role: 'developer',
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
  emptyUserValueError,
};
