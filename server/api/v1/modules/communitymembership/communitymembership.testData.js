 const wrongData = { error: 'Error in operation, please try later..!' };

 const memberDetails = { message: 'Member added' };

 const modified = { message: 'Updated' };

 const deleted = { message: 'Deleted' };

 // correct post
 const memberDetails1 = {
     domain: 'Wipro',
     username: 'Keerthi',
     role: 'Full-Stack-Developer',
 };

 // correct post
 const memberDetails2 = {
     domain: 'Wipro',
     username: 'Aravindh',
     role: 'Full-Stack-Developer',
 };

 // correct post
 const memberDetails3 = {
     domain: 'Wipro',
     username: 'Suresh',
     role: 'Full-Stack-Developer',
 };

 // wrong post
 const noDomainValue = {
     domain: '',
     username: 'Keerthi',
     role: 'Developer',
 };
 // wrong post
 const noUsernameValue = {
     domain: 'wipro',
     username: '',
     role: 'Developer',
 };

 // wrong post
 const noRoleValue = {
     domain: 'wipro',
     username: 'Keerthi',
     role: '',
 };

 // wrong post
 const noValue = {
     domain: '',
     username: '',
     role: '',
 };

 // Role Update
 const updateRoles1 = {
     role: 'Senior-Full-Stack-Developer',
 };

 // Role Update
 const updateRoles2 = {
     role: 'Digital-Manager',
 };

 // wrong update
 const noRoleValueUpdate = {
     role: '',
 };


 // // Remove member
 //  const deleteMember = {
 //    domain: 'Wipro',
 //    username: 'Suresh',
 //  };

 module.exports = {
     memberDetails1,
     memberDetails2,
     memberDetails3,
     noDomainValue,
     noUsernameValue,
     noRoleValue,
     noValue,
     updateRoles1,
     updateRoles2,
     noRoleValueUpdate,
     // deleteMember,
     wrongData,
     memberDetails,
     modified,
     deleted,
 };
