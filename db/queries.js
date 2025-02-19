const pool = require('../config/connection');

const getDepartments = async () => {
    const result = await pool.query('SELECT * FROM department');
    return result.rows;
};

const getRoles = async () => {
    const result = await pool.query('SELECT * FROM role');
    return result.rows;
};

const getEmployees = async () => {
    const result = await pool.query('SELECT * FROM employee');
    return result.rows;
};

// More queries like addDepartment, addRole, addEmployee, updateEmployeeRole, etc.

module.exports = { getDepartments, getRoles, getEmployees };
