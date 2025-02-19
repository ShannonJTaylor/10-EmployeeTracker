import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Set up the connection
const client = new Client({
    user: process.env.DB_USER,        // your PostgreSQL username
    host: process.env.DB_HOST,        // your PostgreSQL host (localhost)
    database: process.env.DB_NAME,    // the database name
    password: process.env.DB_PASSWORD, // your PostgreSQL password
    port: process.env.DB_PORT,        // PostgreSQL port
  });

// Connect to the database
client.connect();

export { client };

// Fetch all departments
const viewDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);  // Pretty print the results in a table format
  };
  
  export { viewDepartments }; 

  //Create similar functions for viewRoles, adding departments, adding roles, adding employees, and viewEmployees

const viewRoles = async () => {
    const res = await client.query('SELECT * FROM role');
    console.table(res.rows);
  };

  export { viewRoles };

const viewEmployees = async () => {
    const res = await client.query('SELECT * FROM employee');
    console.table(res.rows);
  };

  export { viewEmployees };

const addDepartment = async (name) => {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added department: ${name}`);
  };

    export { addDepartment };

const addRole = async (title, salary, department_id, manager_id) => {
    await client.query('INSERT INTO role (title, salary, department_id, manager_id) VALUES ($1, $2, $3, $4)', [title, salary, department_id, manager_id]);
    console.log(`Added role: ${title}`);
  };

    export { addRole };

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log(`Added employee: ${first_name} ${last_name}`);
  };

    export { addEmployee };
  
