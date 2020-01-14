const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
     host: "localhost", 
     port: 3306, 
     user: "root", 
     password: "password", 
     database: "EMS_DB"
});
const query = util.promisify(connection.query).bind(connection);

// The for loop in the following function was being used by in 3 different functions,
// hence a function was made for it so it could be reused
function printer(response){

     for (let i = 0; i < response.length; i++) {
          console.log(`(${i+1}) ${response[i].firstName} ${response[i].lastName}`);
     }
}

// Prints the "Departments" table
async function viewDepartments(){

     try{
          const response = await query('SELECT * FROM departments');
          
          console.log("\nDepartments:");
          console.table(response);
     }
     catch(err){
          return console.log(err);
     }
}

// Prints the "Roles" table
async function viewRoles(){

     try{
          const response = await query('SELECT * FROM roles');
          
          console.log("\nRoles:");
          console.table(response);
     }
     catch(err){
          return console.log(err);
     }
}

// Prints the All the "Employees" with their data
async function viewAllEmployeesData(){
     
     try{
          const response = await query('SELECT e1.e_id AS ID, e1.firstName AS First_Name, e1.lastName AS Last_Name, r.title AS Title, r.salary AS Salary, d.name AS Department_Name, concat(e2.firstName, " ", e2.lastName) AS Manager FROM employees e1 JOIN roles r ON e1.roleID = r.r_id JOIN departments d on r.departmentID = d.d_id LEFT JOIN employees e2 on e1.managerID = e2.e_id;');
          
          console.log("\nAll Employees Data:");
          console.table(response);
     }
     catch(err){
          return console.log(err);
     }
}

// Prints the first & last names of all the Employees belonging to a specified "Department"
async function viewEmployeesByDepartment(departmentName){

     try{
          const response = await query('SELECT e.firstName, e.lastName FROM employees e JOIN roles r ON e.roleID = r.r_id JOIN departments d on r.departmentID = d.d_id WHERE d.name = ?;', [departmentName]);
          
          console.log(`\nName(s) of all the EMPLOYEES working in the "${departmentName}" department:`);
          printer(response);     
     }
     catch(err){
          return console.log(err);
     }
}

// Prints the first & last names of all the Employees that have a specified "Role"
async function viewByEmployeesByRole(roleTitle){

     try{
          const response = await query('SELECT e.firstName, e.lastName FROM employees e JOIN roles r ON e.roleID = r.r_id WHERE r.title = ?;', [roleTitle]);
          
          console.log(`\nName(s) of all the EMPLOYEES who have a Job Title of "${roleTitle}":`);
          printer(response);     
     }
     catch(err){
          return console.log(err);
     }
}

// Prints the first & last names of all the Employees working under a specified "Manager"
async function viewByEmployeesByManager(managerName){

     try{
          const response = await query('SELECT e.firstName, e.lastName FROM employees e JOIN employees m ON e.managerID = m.e_id WHERE m.firstName = ?;', [managerName]);
          
          console.log(`\nName(s) of all the EMPLOYEES working under Manager ${managerName}:`);
          printer(response);   
     }
     catch(err){
          return console.log(err);
     }
}


// Checks if the "Departments" tale is empty or not
async function isDepartmentsEmpty(){

     let result;
     try{
          let count = await query('SELECT COUNT(*) FROM departments');

          if(count === 0)
               result = true;
          else
               result = false;
     }
     catch(err){
          return console.log(err);
     }
     return result;
}

// Checks if the "Roles" tale is empty or not
async function isRolesEmpty(){

     let result;
     try{
          let count = await query('SELECT COUNT(*) FROM roles');

          if(count === 0)
               result = true;
          else
               result = false;
     }
     catch(err){
          return console.log(err);
     }
     return result;
}


// Insert a row into "Departments" table
async function addDepartment(departmentName){

     try{
          await query('INSERT INTO departments(name) VALUES (?);', [departmentName]);
     }
     catch(err){
          return console.log(err);
     }
}

// Insert a row into "Roles" table
async function addRole(title, salary, dID){
     
     try{
          await query('INSERT INTO roles(title, salary, departmentID) VALUES (?, ?, ?);', [title, salary, dID]);
     }
     catch(err){
          return console.log(err);
     }
}

// Insert a row into "Employees" table
async function addEmployee(fName, lName, rID, mID=""){

     try{
          if(mID === ""){
               await query('INSERT INTO employees(firstName, lastName, roleID) VALUES (?, ?, ?);', [fName, lName, rID]);
          }
          else{
               await query('INSERT INTO employees(firstName, lastName, roleID, managerID) VALUES (?, ?, ?, ?);', [fName, lName, rID, mID]);
          }
     }
     catch(err){
          return console.log(err);
     }
}

// Update employee role function
async function updateEmployeRole(){
     
}
// Update employee manager function BONUS, does it mean update an employee's manager or an employee who IS a manager
// Delete row(s) from department, roles, employees, BONUS, problem with this

async function totalBudgetOfDept(departmentName){
     
     try{
          const response = await query('SELECT d.name AS Department_Name, SUM(r.salary) AS Budget FROM employees e JOIN roles r ON e.roleID = r.r_id JOIN departments d ON r.departmentID = d.d_id WHERE d.name = ? GROUP BY(d.name);', [departmentName]);
          
          console.log(`\nTotal Utilized Budget of "${departmentName}" Department = $${response[0].Budget}`); 
     }
     catch(err){
          return console.log(err);
     }
}

exports.viewDepartments = viewDepartments;
exports.viewRoles = viewRoles;
exports.viewAllEmployeesData = viewAllEmployeesData;
exports.isDepartmentsEmpty = isDepartmentsEmpty;
exports.isRolesEmpty = isRolesEmpty;

async function main(){
     
     try{
          // await viewDepartments();
          // await viewRoles();
          // await viewAllEmployeesData();
          // console.log((await isDepartmentsEmpty()));
          // console.log((await isRolesEmpty()));
          // await addEmployee("John", "Doe", 3, 1);
          // await addEmployee("Max", "Payne", 2);
          // await viewEmployees();
          // await viewEmployeesByDepartment("Finances");
          // await viewByEmployeesByManager("Sarah");
          // await viewByEmployeesByRole("Accountant");
          // await totalBudgetOfDept("Finances")
     }
     finally{
         connection.end();
     }
}

main();