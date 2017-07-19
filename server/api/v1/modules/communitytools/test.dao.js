const wrongdata = { message: 'please fill out all fields!!' };

const modified = { message: 'Tool modified' };

const novalue = {
  error: 'please fill out all values',
};
const deleted = { message: 'deleted' };

const actionDeleted = { message: 'action deleted' };

const notFound = { error: 'please enter a valid domain name' };

const catchError = { error: 'Unexpected error occurred, please try again...!' };

const nullValue = { error: 'Please enter valid values!!' };

const existingTool = { error: 'Tool Exists!!' };

const errMsg = { error: 'Please enter a valid domain and tools name' };

const actionMsg = { message: 'Deleted Actions' };

const error = { error: 'Error in operation, please try later..!' };

const eventMsg = { message: 'Deleted Events' };

const tools = [{
  toolId: 'quora',
  actions: ['broadcast', 'write'],
  activityevents: ["'postmessage'"],
}];


const multipleTools = [{
    toolId: 'sermo',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  },
  {
    toolId: 'quora',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  },
  {
    toolId: 'hulu',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  },
];

const multipleWrongTools = [{
    toolId: 'sermo',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  },
  {
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  },
  {
    toolId: 'hulu',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  },
];

const toolsAll = {
  toolname: "sometool",
  avatar: "somephoto.jpg",
  toolurl: "abcdef.com/12345",
  purpose: "maybesomepurpose",
  actions: ["action1", "action2", "action3", "action4", "action5"],
  events: [{
    eventid: "evid",
    eventname: "evname",
    description: "evdescription",
    activity: "somecommunityevent",
    actor: "some actor",
    object: "new object",
    metadata: "someurldatamaybe"
  }, {
    eventid: "evid2",
    eventname: "evname2",
    description: "evdescription2",
    activity: "somecommunityevent2",
    actor: "some actor2",
    object: "new object2",
    metadata: "someurldatamaybe2"
  }]
};

const wrongtools = {

  avatar: "somephoto.jpg",
  toolurl: "abcdef.com/12345",
  purpose: "maybesomepurpose",
  actions: ["action1", "action2", "action3", "action4", "action5"],
  events: [{
    eventid: "evid",
    eventname: "evname",
    description: "evdescription",
    activity: "somecommunityevent",
    actor: "some actor",
    object: "new object",
    metadata: "someurldatamaybe"
  }, {
    eventid: "evid2",
    eventname: "evname2",
    description: "evdescription2",
    activity: "somecommunityevent2",
    actor: "some actor2",
    object: "new object2",
    metadata: "someurldatamaybe2"
  }]
};

const wrongtool = {
  avatar: "somephoto.jpg",
  toolurl: "abcdef.com/12345",
  purpose: "maybesomepurpose",
  actions: ["action1", "action2", "action3", "action4", "action5"],
  events: [{
    eventid: "evid",
    eventname: "evname",
    description: "evdescription",
    activity: "somecommunityevent",
    actor: "some actor",
    object: "new object",
    metadata: "someurldatamaybe"
  }, {
    eventid: "evid2",
    eventname: "evname2",
    description: "evdescription2",
    activity: "somecommunityevent2",
    actor: "some actor2",
    object: "new object2",
    metadata: "someurldatamaybe2"
  }]
};


const wrongvalue = [{
  domain: 'engineer',
  toolId: '',
  actions: ['broadcast', 'write'],
  activityEvents: ['postmessage'],
}];

const updatetools = {
  toolname: "sometool",
  avatar: "somephoto.jpg",
  toolurl: "abcdef.com/12345",
  purpose: "maybesomepurpose",
  actions: ["action1", "action2", "action3", "action4", "action5"],
  events: [{
    eventid: "evid",
    eventname: "evname",
    description: "evdescription",
    activity: "somecommunityevent",
    actor: "some actor",
    object: "new object",
    metadata: "someurldatamaybe"
  }, {
    eventid: "evid2",
    eventname: "evname2",
    description: "evdescription2",
    activity: "somecommunityevent2",
    actor: "some actor2",
    object: "new object2",
    metadata: "someurldatamaybe2"
  }]
};
const patch = {
  domain: 'engineer.wipro.blr',
  tool: 'quora',
};

const patchUpper = {
  domain: 'DoCtorS.blr',
  tool: 'Quora',
};

const notExisting = {
  domain: 'dummyvalue',
  tool: 'dummyvalue',
};


module.exports = {
  wrongdata,
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
  existingTool,
  errMsg,
  notExisting,
  actionMsg,
  error,
  eventMsg,
  patchUpper,
  actionDeleted,
  multipleTools,
  multipleWrongTools,
  novalue,
};
