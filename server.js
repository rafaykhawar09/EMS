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
          const response = await query('SELECT * FROM Employees');
          
          console.log("\nEmployees:");
          console.table(response);
     }
     catch(err){
          return console.log(err);
     }
}


exports.viewDepartments = viewDepartments;

async function main(){
     
     await viewDepartments();
     await viewRoles();
     await viewEmployees();
}

main();