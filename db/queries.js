const pool = require('../config/connection');

const getDepartments = async () => {
    try {
        const result = await pool.query('SELECT * FROM department');
        return result.rows;
    } catch (err) {
        console.log('Error fetching departments:', err.message);
        return [];
    }
};

const getRoles = async () => {
    try {    
        const result = await pool.query('SELECT * FROM role');
        return result.rows;
    } catch (err) {
        console.log('Error fetching roles:', err.message);
        return [];
    }
};

const getEmployees = async () => {
    try {
    const result = await pool.query('SELECT * FROM employee');
    return result.rows;
} catch (err) {
    console.log('Error fetching employees:', err.message);
    return [];
    }
};

const addDepartment = async (name) => {
    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Added department: ${name}`);
    } catch (err) {
        console.error('Error adding department:', err.message);
    }
};

// Add role
const addRole = async (title, salary, department_id) => {
    try {
        await pool.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        );
        console.log(`Added role: ${title}`);
    } catch (err) {
        console.error('Error adding role:', err.message);
    }
};

// Add employee
const addEmployee = async (first_name, last_name, role_id, manager_id = null) => {
    try {
        await pool.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, role_id, manager_id]
        );
        console.log(`Added employee: ${first_name} ${last_name}`);
    } catch (err) {
        console.error('Error adding employee:', err.message);
    }
};

// Update employee role
const updateEmployeeRole = async (employee_id, new_role_id) => {
    try {
        await pool.query(
            'UPDATE employee SET role_id = $1 WHERE id = $2',
            [new_role_id, employee_id]
        );
        console.log(`Updated employee's role with ID: ${employee_id}`);
    } catch (err) {
        console.error('Error updating employee role:', err.message);
    }
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};


