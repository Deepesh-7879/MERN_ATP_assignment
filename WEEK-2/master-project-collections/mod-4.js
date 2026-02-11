import { roles } from "./DataSetup.js";

//Get all role names
const roleNames = Object.keys(roles);
console.log(roleNames);
//Check if student can delete
const studentCanDelete = roles.student.includes("delete");
console.log(studentCanDelete);
//Create a flat list of all unique permissions
const allPermissions = [...new Set(Object.values(roles).flat())];
console.log(allPermissions);
//Add moderator role immutably
const addModerator = newPermissions => ({...roles,moderator: newPermissions});
console.log(addModerator);
