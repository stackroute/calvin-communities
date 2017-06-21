 const wrongdata = { message: 'please fill out all fields!!' };

 const toolcreated = { message: 'tool created' };

 const modified = { message: 'Tool modified' };

 const deleted = { message: 'Tool Deleted' };

 const tools = [{
   domain: 'Engineer.wipro.blr',
   toolId: 'Quora',
   actions: ["'broadcast'", "'write'"],
   activityEvents: ["'postmessage'"],
 }];

 const toolsAll = [{
   domain: 'Engineer.wipro.blr',
   toolId: 'Quora',
   actions: ["'broadcast'", "'write'"],
   activityEvents: ["'postmessage'"],
 }];

 const wrongtools = [{
   domain: '',
   id: 'stackoverflow',
   action: ['broadcast', 'write'],
   events: ['postmessage'],
 }];

 const wrongvalue = [{
   domain: 'engineer',
   id: '',
   action: ['broadcast', 'write'],
   events: ['postmessage'],
 }];

 const updatetools = {
   action: 'publish',
   events: 'post-self',
 };
 const patch = {
   domain: 'Engineer.wipro.blr',
   tool: 'Quora',
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
 };
