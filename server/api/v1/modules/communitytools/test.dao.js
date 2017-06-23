 const wrongdata = { message: 'please fill out all fields!!' };

 const toolcreated = { message: 'tool created' };

 const modified = { message: 'Tool modified' };

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
   activityEvents: ["'postmessage'"],
 }];

 const toolsAll = [{
   toolId: 'WeMedUp',
   actions: ["'broadcast'", "'write'"],
   activityEvents: ["'postmessage'"],
 }];

 const wrongtools = [{
   actions: ['broadcast', 'write'],
   activityEvents: ['postmessage'],
 }];

 const wrongtool = [
   [{
     toolId: '',
     actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
     activityEvents: ['newannouncement', 'like', 'remove'],
     domain: '',
   }],
 ];


 const wrongvalue = [{
   domain: 'engineer',
   toolId: '',
   actions: ['broadcast', 'write'],
   activityEvents: ['postmessage'],
 }];

 const updatetools = {
   action: 'publish',
   events: 'post-self',
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
   patchUpper,
   actionDeleted
 };
