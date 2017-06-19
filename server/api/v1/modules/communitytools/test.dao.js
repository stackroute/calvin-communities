 const wrongdata = { message: 'please fill out all fields!!' };

 const toolcreated = { message: 'tool created' };

 const modified = { message: 'Tool modified' };

 const deleted = { message: 'Tool Deleted' };

 const tools = {
   domain: 'teacher.community',
   id: 'stackoverflow',
 };

 const toolsAll = {
   domain: 'Engineer.wipro.blr',
   id: 'Quora',
   action: ["'broadcast'", "'write'"],
   events: ["'postmessage'"],
 };

 const wrongtools = {
   domain: '',
   id: 'stackoverflow',
   action: ["'broadcast'", "'write'"],
   events: ["'postmessage'"],
 };

 const wrongvalue = {
   domain: 'engineer',
   id: '',
   action: ["'broadcast'", "'write'"],
   events: ["'postmessage'"],
 };

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
