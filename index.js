// index.js
const inquirer = require('inquirer');
const { 
    getDepartments, 
    getRoles, 
    getEmployees, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployeeRole 
} = require('./db/queries');  // Importing all the necessary functions

async function mainMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee role',
                'Exit'
            ],
        },
    ]);

    switch (action) {
        case 'View all departments':
            console.table(await getDepartments());
            break;
        case 'View all roles':
            console.table(await getRoles());
            break;
        case 'View all employees':
            console.table(await getEmployees());
            break;
        case 'Add department':
            const { departmentName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the new department:'
                }
            ]);
            await addDepartment(departmentName);
            break;
        case 'Add role':
            const roleDetails = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'Enter the title of the role:'
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'Enter the salary for the role:'
                },
                {
                    type: 'input',
                    name: 'departmentId',
                    message: 'Enter the department ID for the role:'
                },
                
            ]);
            await addRole(roleDetails.roleTitle, roleDetails.roleSalary, roleDetails.departmentId);
            break;
        case 'Add employee':
            const employeeDetails = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee:'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the employee:'
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter the role ID for the employee:'
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter the manager ID for the employee (optional):',
                    default: null
                }
            ]);
            await addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId);
            break;
        case 'Update employee role':
            const updateDetails = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter the employee ID to update:'
                },
                {
                    type: 'input',
                    name: 'newRoleId',
                    message: 'Enter the new role ID for the employee:'
                }
            ]);
            await updateEmployeeRole(updateDetails.employeeId, updateDetails.newRoleId);
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    mainMenu(); // Restart menu after an action
}

// Start the application
mainMenu();

// const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('.db/db');  // Importing the viewDepartments function

// const mainMenu = async () => {
//   const answers = await inquirer.prompt([
//     {
//       type: 'list',
//       name: 'action',
//       message: 'What would you like to do?',
//       choices: [
//         'View all departments',
//         'View all roles',
//         'View all employees',
//         'Add a department',
//         'Add a role',
//         'Add an employee',
//         'Update an employee role',
//         'Exit'
//       ],
//     },
//   ]);

//   switch (answers.action) {
//     case 'View all departments':
//       await viewDepartments();  // Show departments
//       break;

//     case 'View all roles':
//         await viewRoles(); //View all roles
//         break;
      
//     case 'View all employees':
//         await viewEmployees(); //View all employees
//         break;

//     case 'Add a department':
//         await addDepartmentPrompt(); //Add a department
//         break;

//     case 'Add a role':
//         await addRolePrompt(); //Add a role
//         break;

//     case 'Add an employee':
//         await addEmployeePrompt(); //Add an employee
//         break;

//     case 'Update an employee role':
//         await updateEmployeeRolePrompt(); //Update an employee role
//         break;

//     case 'Exit':
//         console.log('Goodbye!'); 
//         process.exit(); //Exit the app
        
//     default:
//         break;
//   }

//   // Return to the main menu after an action
//   mainMenu();
// };

// //Add department
// const addDepartmentPrompt = async () => {
//     const { departmentName } = await inquirer.prompt(
//         {
//             type: 'input',
//             name: 'departmentName',
//             message: 'Enter the name of the department:',
//         },
// );

// await addDepartment(departmentName);
// mainMenu();
// };

// //Add role Prompt
// const addRolePrompt = async () => {
//     const { title, salary, departmentId } = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'title',
//             message: 'Enter the title of the role:',
//         },
//         {
//             type: 'input',
//             name: 'salary',
//             message: 'Enter the role salary:',
//         },
//     ]);
//     await addRole(title, salary, departmentId);
//     mainMenu();
// };

// //Add employee prompt
// const addEmployeePrompt = async () => {
//     const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'firstName',
//             message: 'Enter the first name of the employee:',
//         },
//         {
//             type: 'input',
//             name: 'lastName',
//             message: 'Enter the last name of the employee:',
//         },
//         {
//             type: 'input',
//             name: 'roleId',
//             message: 'Enter the role ID for the employee:',
//         },
//         {
//             type: 'input',
//             name: 'managerId',
//             message: 'Enter the manager ID (or leave blank if none):',
//             default: null,  
//         },
//     ]);
//     await addEmployee(firstName, lastName, roleId, managerId);
//     mainMenu();
// };

// //Update the employee Role Prompt
// const updateEmployeeRolePrompt = async () => {
//     const { employeeId, newRoleId } = await inquirer.prompt([
//       {
//         type: 'input',
//         name: 'employeeId',
//         message: 'Enter the employee ID whose role you want to update:',
//       },
//       {
//         type: 'input',
//         name: 'newRoleId',
//         message: 'Enter the new role ID for the employee:',
//       },
//     ]);
  
//     await updateEmployeeRole(employeeId, newRoleId);
//     mainMenu();
//   };
  

// // Start the app
// mainMenu();
