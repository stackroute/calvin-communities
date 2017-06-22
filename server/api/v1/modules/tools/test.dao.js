  const wrongdata = { message: 'please fill out all fields!!' };

  const toolcreated = { message: 'tool created' };

  const modified = { message: 'Tool modified' };

  const deleted = { message: 'deleted' };

  const notFound = { error: 'please enter a valid domain name' };

  const catchError = { error: 'Unexpected error occurred, please try again...!' };

  const nullValue = { error: 'please enter all fields' };

  const existingTool = { error: 'Tool Exists!!' };

  const errMsg = { error: 'Please enter a valid domain and tool name' };

  const actionMsg = { message: 'Deleted Actions' };

  const error = { error: 'Error in operation, please try later..!' };

  const eventMsg = { message: 'Deleted Events' };

  const domainErr = { error: 'please enter a valid tool' };

  const tools = [{
    domain: 'doctor.wipro.blr',
    toolId: 'quora',
    actions: ['broadcast', 'write'],
    activityEvents: ["'postmessage'"],
  }];

  const toolsAll = [{
    domain: 'engineer.wipro.blr',
    toolId: 'quora',
    actions: ["'broadcast'", "'write'"],
    activityEvents: ["'postmessage'"],
  }];

  const wrongtools = [{
    toolId: 'stackoverflow',
    actions: ['broadcast', 'write'],
    activityEvents: ['postmessage'],
  }];

  const wrongtool =
    [{
      toolId: 'sermo',
      actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
      activityEvents: ['newannouncement', 'like', 'remove'],
      domain: '',
    }];


  const wrongvalue = [{
    domain: 'engineer',
    toolId: '',
    actions: ['broadcast', 'write'],
    activityEvents: ['postmessage'],
  }];


  const patch = {
    domain: 'engineer.wipro.blr',
    tool: 'quora',
  };

  const notExisting = {
    domain: 'dummyvalue',
    tool: 'dummyvalue',
  };

  const updatetools = { tools: 'publish' };


  module.exports = {
    wrongdata,
    toolcreated,
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
    domainErr,
  };

