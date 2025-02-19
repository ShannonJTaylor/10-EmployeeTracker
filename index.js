const inquirer = require('inquirer');
const { viewDepartments } = require('./db');  // Importing the viewDepartments function

const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    },
  ]);

  switch (answers.action) {
    case 'View all departments':
      await viewDepartments();  // Show departments
      break;
    case 'View all roles':
        await viewRoles();
        break;
      // Call the function for viewing roles
    case 'View all employees':
        await viewEmployees();
      // Call the function for viewing employees
      break;
    case 'Add a department':
        await addDepartment();
      // Call the function to add a department
      break;
    case 'Add a role':
        await addRole();
      // Call the function to add a role
      break;
    case 'Add an employee':
        await addEmployee();
      // Call the function to add an employee
      break;
    case 'Update an employee role':
        await updateEmployeeRole();
      // Call the function to update an employee role
      break;
    case 'Exit':
      client.end();  // Close the database connection
      break;
    default:
      break;
  }

  // Return to the main menu after an action
  mainMenu();
};

// Start the app
mainMenu();
