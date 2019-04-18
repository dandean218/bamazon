//set up js file
var mysql = require('mysql');
var inquirer = require('inquirer');
var figlet = require('figlet');

//connect to mySQL
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw(err);
    bamazonStart();
});

function bamazonStart(){
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw(err);
    figlet('Welcome to BAMAZON', function(err, data){
        if(err) throw(err);
        console.log(data);
    });

    // for(let i = 0; i < res.length; i++){
        console.table(res)
    // }
    })
}


//set up JS file that logs data from table

//use inquirer to prompt user with questions

//once order is placed by user, send mysql request to see if fake store has product available

//use JS file to communicate status of order

//use mysql to update data based on what customer wanted

