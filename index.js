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

const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees_db",
});
db.connect((error) => {
  if (error) throw error;
  mainQuestions();
});

const mainQuestions = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee role",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;
      if (choices == "View all departments") {
        renderDept();
      } else if (choices === "View all roles") {
        renderRoles();
      } else if (choices === "View all employees") {
        renderEmployees();
      } else if (choices === "Add department") {
        addDept();
      } else if (choices === "Add role") {
        addRole();
      } else if (choices === "Add employee") {
        addEmployee();
      } else {
        //updateEmployee()
      }
    });
};
const renderDept = () => {
  db.query("SELECT * FROM department", function (err, result) {
    console.table(result);
    mainQuestions();
  });
};
const renderRoles = () => {
  db.query(
    `SELECT roles.r_id, roles.title, roles.salary, department.name
    FROM roles JOIN department ON roles.department_id = department.d_id`,
    function (err, result) {
      console.table(result);
      mainQuestions();
    }
  );
};
const renderEmployees = () => {
  db.query(
    `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    employee.manager_id, 
    roles.title, 
    roles.salary, 
    department.name
    FROM employee
    JOIN roles ON roles.r_id = employee.role_id
    JOIN department 
    ON department.d_id = roles.department_id`,

    function (err, result) {
      console.table(result);
      mainQuestions();
    }
  );
};
const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's departments name?",
      },
    ])
    .then((response) => {
      const { name } = response;
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        name,
        (err, result) => {
          if (err) throw err;
          console.log("New department added");
          mainQuestions();
        }
      );
    });
};
const addRole = () => {
  db.query("SELECT * FROM department", function (err, result) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the new roles name?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the new roles salary?",
        },
        {
          type: "list",
          name: "dept",
          message: "What is the department?",
          choices: result.map((item) => ({
            name: item.name,
            value: item.d_id,
          })),
        },
      ])
      .then((response) => {
        const { title, salary, dept } = response;
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
          [title, salary, dept],
          (err, result) => {
            if (err) throw err;
            mainQuestions();
          }
        );
      });
  });
};

const addEmployee = () => {
  db.query("SELECT * FROM roles", function (err, result) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first",
          message: "first name?",
        },
        {
          type: "input",
          name: "last",
          message: "last name?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the employee's role?",
          choices: result.map((item) => ({
            name: item.title,
            value: item.r_id,
          })),
        },
      ])
      .then((response) => {
        const { first, last, role } = response;
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`,
          [first, last, role],
          mainQuestions(),
          (err, result) => {
            if (err) throw err;
          }
        );
      
      });
  });
};