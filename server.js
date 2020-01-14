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

async function viewEmployees(){
     
     try{
          const response = await query('SELECT * FROM employees');
          
          console.log("\nEmployees:");
          console.table(response);
     }
     catch(err){
          return console.log(err);
     }
}

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



exports.viewDepartments = viewDepartments;
exports.viewRoles = viewRoles;
exports.viewEmployees = viewEmployees;
exports.isDepartmentsEmpty = isDepartmentsEmpty;
exports.isRolesEmpty = isRolesEmpty;

async function main(){
     
     try{
          await viewDepartments();
          await viewRoles();
          await viewEmployees();
          console.log((await isDepartmentsEmpty()));
          console.log((await isRolesEmpty()));
     }
     finally{
         connection.end();
     }
}

main();