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
    try {
      const res = await client.query('SELECT * FROM department');
      console.table(res.rows);  // Pretty print the results in a table format
    } catch (err) {
      console.log('Error fetching departments:', err.message);
    }    
  };  
  export { viewDepartments };   

const viewRoles = async () => {
    try {
    const res = await client.query('SELECT * FROM role');
    console.table(res.rows);
    } catch (err) {
    console.log('Error fetching roles:', err.message);
    }
  };
  export { viewRoles };

const viewEmployees = async () => {
    try {
    const res = await client.query('SELECT * FROM employee');
    console.table(res.rows);
    } catch (err) {
    console.log('Error fetching employees:', err.message);
    }
  };
  export { viewEmployees };

const addDepartment = async (name) => {
    try {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added department: ${name}`);
    } catch (err) {
    console.log('Error adding department:', err.message);
    }
  };
    export { addDepartment };

const addRole = async (title, salary, department_id ) => {
    try {
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3, $4)', [title, salary, department_id]);
    console.log(`Added role: ${title}`);
    } catch (err) {
    console.log('Error adding role:', err.message);
    }
  };
    export { addRole };

const addEmployee = async (first_name, last_name, role_id, manager_id = null) => {
    try {
    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log(`Added employee: ${first_name} ${last_name}`);
    } catch (err) {
    console.log('Error adding employee:', err.message);
    }
  };
    export { addEmployee };
  
