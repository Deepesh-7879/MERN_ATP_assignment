import {users} from './DataSetup.js'
//Get only active users
const activeuser=users.filter((user) => user.active)
console.log(activeuser);
//Extract names of active users
const activeusername=activeuser.map(user => user.name)
console.log(activeusername);
//Check if any admin exists
const adminrole=users.find(user => user.role='admin')
console.log(adminrole);
//Find user by id
const findUserById =users.find(user => user.id == 3);
console.log(findUserById);
// Deactivate a user immutably
const deactivateUser =users.map(user => user.id == 3 ? { ...user, active: false } : user);
console.log(deactivateUser);

