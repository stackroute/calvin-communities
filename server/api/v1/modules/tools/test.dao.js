 const wrongdata = { message: 'please fill out all fields!!' };

 const toolcreated = { message: 'tool created' };

 const modified = { message: 'Tool modified' };

 const deleted = { message: 'Tool Deleted' };

 const tools = {
   domain: 'Engineer.wipro.blr',
   tools: ["'broadcast'", "'write'"],
 };


 const wrongtools = {
   domain: '',
   tools: ["'broadcast'", "'write'"],
 };

 const updatetools = { tool: 'publish' };

 const patch = {
   domain: 'Engineer.wipro.blr',
 };


 module.exports = {
   wrongdata,
   toolcreated,
   modified,
   tools,
   wrongtools,
   updatetools,
   patch,
     // wrongvalue,
     // toolsAll,
   deleted,
     //tool,
 };
