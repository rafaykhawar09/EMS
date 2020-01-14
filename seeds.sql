DROP DATABASE IF EXISTS EMS_DB;

CREATE DATABASE EMS_DB;

USE EMS_DB;

CREATE TABLE employees(
	
     e_id INT AUTO_INCREMENT PRIMARY KEY,
     firstName VARCHAR(30) NOT NULL,
     lastName VARCHAR(30) NOT NULL,
     roleID INT,
     managerID INT,

     FOREIGN KEY(roleID) REFERENCES roles(r_id),
     FOREIGN KEY(managerID) REFERENCES employees(e_id)
     
);

CREATE TABLE departments(
	
     d_id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(30) NOT NULL  
);

CREATE TABLE roles(

     r_id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(30),
     salary decimal(7, 2),
     departmentID INT,

     FOREIGN KEY(departmentID) REFERENCES departments(d_id)    
);










