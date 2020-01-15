const inquirer = require("inquirer");
const server = require("./server");

async function prompt(){

     try{
          let firstRes;
          do{
               // Add/View/Remove/Exit
               firstRes = await inquirer.prompt([
                    {
                         type: "list",
                         name: "input",
                         message: "What do you want to do?",
                         choices: [
                              "Add - Department, Role OR Employee",
                              
                              "View - Department, Role OR Employee",

                              "Update - Employe Role",

                              "Update - Employe Manager",

                              "View Total Budget of a Department",

                              "Exit"
                         ]
                    }
               ]);

               // if Add
               // else if View
               // else if Remove
               if(firstRes.input === "Add - Department, Role OR Employee"){

                    let secRes = await inquirer.prompt([
                         {
                              type: "list",
                              name: "input",
                              message: "What do you want to ADD?",
                              choices: [
                                   "Department",
                                   
                                   "Role",

                                   "Employee"
                              ]
                         }
                    ]);

                    if(secRes.input === "Department"){

                         let thirdRes = await inquirer.prompt([
                              {
                                   type: "input",
                                   name: "deptName",
                                   message: "Enter a name for the Department you want add:"
                              }
                         ]);
                         
                         await server.addDepartment(thirdRes.deptName);
                    }
                    else if(secRes.input === "Role"){
                         
                         if((await server.isDepartmentsEmpty()) === true){
                              console.log("Can not enter a Role if a Department doesn't exist. Please enter a Department first.")
                         }
                         else{
                              let thirdRes = await inquirer.prompt([
                                   {
                                        type: "input",
                                        name: "title",
                                        message: "Enter TITLE for the Role:"
                                   },
                                   {
                                        type: "input",
                                        name: "salary",
                                        message: "Enter SALARY associated with the Role: $"
                                   },
                                   {
                                        type: "list",
                                        name: "deptName",
                                        message: "Choose a DEPARTMENT associated with the Role:",
                                        choices: (await server.getAllDepartmentNames())
                                   }
                              ]);
     
                              let deptID = await server.getDepartmentID(thirdRes.deptName).then(function(data){
     
                                   server.addRole(thirdRes.title, thirdRes.salary, data[0].d_id);
                              })
                         }     
                         
                    }
                    else if(secRes.input === "Employee"){

                         if((await server.isDepartmentsEmpty()) === true){
                              console.log("Can not enter an Employee if a Department doesn't exist. Please enter a Department first.")
                         }
                         else if((await server.isRolesEmpty()) === true){
                              console.log("Can not enter an Employee if a Role doesn't exist. Please enter a Role first.")
                         }
                         else{
                              let roles = [];
                              let temp = await server.getAllRolesTitles();
                              for (let i = 0; i < temp.length; i++) {
                                   roles.push(temp[i].title);
                              }
                              
                              let thirdRes = await inquirer.prompt([
                                   {
                                        type: "input",
                                        name: "fName",
                                        message: "Enter FIRST NAME for Employee:"
                                   },
                                   {
                                        type: "input",
                                        name: "lName",
                                        message: "Enter LAST NAME for Employee:"
                                   },
                                   {
                                        type: "list",
                                        name: "roleTitle",
                                        message: "Choose a ROLE:",
                                        choices: roles
                                   },
                                   {
                                        type: "list",
                                        name: "deptName",
                                        message: "Choose a DEPARTMENT:",
                                        choices: (await server.getAllDepartmentNames())
                                   }    
                              ]);
     
                              let deptID = await server.getDepartmentID(thirdRes.deptName).then(function(data){
     
                                   server.addRole(thirdRes.title, thirdRes.salary, data[0].d_id);
                              })
                         }
                         // console.log("add employee")
                    }
               }
               else if(firstRes.input === "View - Department, Role OR Employee"){

                    let secRes = await inquirer.prompt([
                         {
                              type: "list",
                              name: "input",
                              message: "What do you want to VIEW?",
                              choices: [
                                   "Department(s)",
                                   
                                   "Role(s)",

                                   "Employee(s)"
                              ] 
                         }
                    ]);

                    if(secRes.input === "Department(s)"){
                         await server.viewDepartments();
                    }
                    else if(secRes.input === "Role(s)"){
                         await server.viewRoles();
                    }
                    else if(secRes.input === "Employee(s)"){

                         let thirdRes = await inquirer.prompt([
                              {
                                   type: "list",
                                   name: "input",
                                   message: "Choose from the following:",
                                   choices: [
                                        "-> View All Employees & All of their Data",
                                        "-> View All Employees By Department",
                                        "-> View All Employees By Role",
                                   ]
                              }
                         ]);

                         if(thirdRes.input === "-> View All Employees & All of their Data"){

                              await server.viewAllEmployeesData();
                         }
                         else if(thirdRes.input === "-> View All Employees By Department"){

                              console.log(await server.getAllDepartmentNames());
                              let fourthRes = await inquirer.prompt([
                                   {
                                        type: "list",
                                        name: "deptName",
                                        message: "Choose from the following:",
                                        choices: (await server.getAllDepartmentNames())
                                   }
                              ]);

                              await server.viewEmployeesByDepartment(fourthRes.deptName);
                         }
                         else if(thirdRes.input === "-> View All Employees By Role"){

                              let roles = [];
                              let temp = await server.getAllRolesTitles();
                              for (let i = 0; i < temp.length; i++) {
                                   roles.push(temp[i].title);
                                   
                              }

                              let fourthRes = await inquirer.prompt([
                                   {
                                        type: "list",
                                        name: "input",
                                        message: "Choose from the following:",
                                        choices: roles
                                   }
                              ]);

                              await server.viewByEmployeesByRole(fourthRes.input);
                         }
                    }
               }
               else if(firstRes.input === "Update - Employee Role"){

                    let secRes = await inquirer.prompt([
                         {
                              type: "list",
                              name: "input",
                              message: "Choose an Employee whose Role you want to update:",
                              choices: [] 
                         }
                    ]);
               }
               else if(firstRes.input === "Update - Employee Manager"){

               }
               else if(firstRes.input === "View Total Budget of a Department"){

                    let secRes = await inquirer.prompt([
                         {
                              type: "list",
                              name: "deptName",
                              message: "Choose a Department:",
                              choices: (await server.getAllDepartmentNames())
                         }
                    ]);

                    await server.totalBudgetOfDept(secRes.deptName)
               }
          }while(firstRes.input !== "Exit");
     }
     catch(err){
          return console.log(err);
     }
     finally{
          server.connection.end();
     }
};

async function main(){

     // server.getDepartments()
     await prompt();
}

main();