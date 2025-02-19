const figlet = require('figlet');
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

// Display the title using figlet
figlet('Employee Tracker', (err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    
    // Start the main menu AFTER displaying the title
    mainMenu();
});

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



