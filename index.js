// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

console.clear();
const mysql = require('mysql12');
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password:'',
        database: 'employees'
    },
    console.log("connected to employee db")
);



inquirer
.prompt([
    {
        type: "list",
        name: "initialPrompt",
        message:"What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
    }
])

.then((data) => {
    switch(data){
        case "View All Employees":
            db.query('SELECT * FROM employee', function (err,res)  {
                console.table(results);
            });
            break;
            case "Add Employee":
                db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)')
                break;
                case "Update Employee Role":
            db.query('SELECT first_name, last_name, role_id, FROM employee, UPDATE employee, SET role_id (?) ')
            break;
        case "View All Roles":
            db.query('SELECT * FROM role', function (err, results) {
                console.table(results);
            });
        case "Add Role":
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?)')
            break;
        case "View All Departments":
            db.query('SELECT id.name FROM department', function (err, results) {
                console.table(results);
            });
        case "Add Departments":
            db.query('INSERT INTO department (name) VALUES (?)')
            default:
                    

    }
});