const inquirer = require("inquirer");
const SERVER = require("./server");

async function firstQues(){

     let response;
     
     try{
          response = await inquirer.prompt([
               {
                    type: "list",
                    name:  "input",
                    message: "What would you like to do?",
                    choices: [
                         "Add Departments, Roles, Employees",
                         "View Departments, Roles, Employees",
                         "Update Employee Roles"
                    ]
               }
          ]);
     }
     catch(err){
          return console.log(err);
     }

     return response;
}

async function secondQues(firstRes){

     let response;

     try{
          if(firstRes.input === "Add Departments, Roles, Employees"){

               response = await inquirer.prompt([
                    {
                         type: "list",
                         name: "input",
                         message: "What do you want to ADD?",
                         choices: [
                              "Departments",
                              "Roles",
                              "Employees"
                         ]
                    }
               ]);

               if(response.input === "Departments"){

               }
               else if(response.input === "Roles"){

               }
               else if(response.input === "Employees"){

               }
          }
     }
     catch(err){
          return console.log(err);
     }

     return response;
}


async function prompt(){

     
     do{
          let firstRes = await firstQues();

          let secondRes = await secondQues(firstRes);
     }
     while(true);
};

async function main(){

     // await prompt();
     // let departments = await SERVER.viewDepartments();
     // console.log(departments);
}

main();