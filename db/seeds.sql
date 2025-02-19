INSERT INTO department (name) VALUES ('HR'), ('Engineering'), ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 75000, 2),
('HR Manager', 60000, 1),
('Accountant', 55000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Johnson', 1, NULL),
('Bob', 'Smith', 2, 1),
('Charlie', 'Brown', 3, NULL);
