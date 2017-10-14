const modified = { message: 'Tool modified' };

const deleted = { message: 'deleted' };

const notFound = { error: 'please enter a valid domain name' };

const catchError = { error: 'Unexpected error occurred, please try again...!' };

const nullValue = { error: 'please enter all fields' };

const errMsg = { error: 'Please enter a valid domain and tool name' };

const actionMsg = { message: 'Deleted Actions' };

const posted = { message: 'updated tool' };

const eventMsg = { message: 'Deleted Events' };

const domainErr = { error: 'please enter a valid tool' };

const errorOccured = { error: 'Error Occured' };
const tools = [{
  toolId: 'quora',
  actions: ['broadcast', 'write'],
  activityEvents: ["'postmessage'"],
}];

const Capstools = [{
  toolId: 'QuOra',
  actions: ['broaDcast', 'wRite'],
  activityEvents: ["'postmessage'"],
}];

const multipletools = [{
  toolId: 'forum',
  actions: ['broadcast', 'write'],
  activityEvents: ["'postmessage'"],
}, {
  toolId: 'sermo',
  actions: ['broadcast', 'write'],
  activityEvents: ["'postmessage'"],
}, {
  toolId: 'stack-overflow',
  actions: ['broadcast', 'write'],
  activityEvents: ["'postmessage'"],
}];

const multipleWrongtools = [{
  toolId: 'forum',
  actions: ['broadcast', 'write'],
  activityEvents: ["'postmessage'"],
}, {
  actions: ['broadcast', 'write'],
  activityEvents: ["'postmessage'"],
}, {
  toolId: 'stack-overflow',
  actions: ['broadcast', 'write'],
  activityEvents: ["'postmessage'"],
}];

const toolsAll = [{
  toolId: 'quora',
  actions: ["'broadcast'", "'write'"],
  activityEvents: ["'postmessage'"],
}];

const wrongtools = [{
  actions: ['broadcast', 'write'],
  activityEvents: ['postmessage'],
}];

const wrongtool = [{
  toolId: '',
  actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
  activityEvents: ['newannouncement', 'like', 'remove'],

}];


const wrongvalue = [{
  domain: 'engineer',
  toolId: '',
  actions: ['broadcast', 'write'],
  activityEvents: ['postmessage'],
}];


const patch = {
  toolid: 'engineer.wipro.blr',
  domainname: 'quora',
};

const notExisting = {
  domain: 'dummyvalue',
  tool: 'dummyvalue',
};

const updatetools = { tools: 'publish' };


module.exports = {
  modified,
  tools,
  wrongtools,
  updatetools,
  patch,
  wrongvalue,
  toolsAll,
  deleted,
  notFound,
  catchError,
  nullValue,
  wrongtool,
  multipletools,
  errMsg,
  notExisting,
  actionMsg,
  eventMsg,
  domainErr,
  errorOccured,
  posted,
  multipleWrongtools,
  Capstools,
};
