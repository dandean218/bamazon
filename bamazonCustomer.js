//set up js file
var mysql = require('mysql');
var inquirer = require('inquirer');
var figlet = require('figlet');

const util = require('util');

//connect to mySQL
const connection = mysql.createConnection({
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

//wraps the callback based function in a Promise
const figletPromise = util.promisify(figlet);
//here, the query() function does not preserve the value of 'this' process of wrapping the function, 
//so we have to manually bind "this" within the query method to the original connection object to correct this
//and make the query() method work as expected again. 
const sqlPromise = util.promisify(connection.query.bind(connection)); 

// if we are using await in a function, we have to decorate it with async, like below
async function bamazonStart(){
    //callback (hell) way -- not good, very unreadable
    // figlet('Welcome to BAMAZON', function(error, data) {
    //     if(error) {
    //         console.error(error);
    //         return;
    //     }
    //     console.log(data);
    //     connection.query('SELECT * FROM products', function(sqlError, sqlData) {
    //         if(sqlError) {
    //             console.error(sqlError);
    //             return;
    //         }
    //         console.table(sqlData);
    //     });
    // });

    //  promise chain way -- we convert our callback-based functions into "then-able" promises using promisify()
    //  huge improvement in readability and works, but is not consistently sequential when console.log()'ing, for some reason...
    // figletPromise('Welcome to BAMAZON')
    //     .then(function(data){
    //         console.log(data);
    //     })
    //     .then(sqlPromise('SELECT * FROM products'))
    //     .then(function(sqlData) {
    //         console.table(sqlData);
    //     })
    //     .catch(function(error) {
    //         console.log(error)
    //     });

    //  async-await way. allows you to write async code in a way that "feels" sync.
    //  in other words, line 64 blocks line 65, and line 65 blocks line 66, just the same way that line 66 blocks line 67
    //  even though lines 64 and 65 are promises (future code) and lines 66 and 67 are regular synchronous functions.
    try {
        const data = await figletPromise('Welcome to BAMAZON');
        const sqlData = await sqlPromise('SELECT * FROM products');
        console.log(data);
        console.table(sqlData);
        const answers = await inquirer
            .prompt([
                /* Pass your questions in here */
                {   name: 'id',
                    type: 'input',
                    message: 'What product ID are you looking to buy?'
                  },
                  {
                    name: 'quantity',
                    type: 'input',
                    message: 'How many did you want to buy?'
                  },
            ]);
        let idToBuy = parseInt(answers.id);
        // console.log(answers.id);
        let quantityToBuy = parseInt(answers.quantity);
        // console.log(answers.quantity);
        
        
        let stockFinal = 0;
        let purchaseCost = 0;
        let sqlData2;
        let command = "";

        for(let i=0; i<sqlData.length; i++){
            // console.log(sqlData[i].item_id);
            // console.log(idToBuy);
            if(sqlData[i].item_id === idToBuy){
                //fun shit happens
                stockFinal = sqlData[i].stock_quantity - quantityToBuy;
                if(stockFinal < 0){
                    console.log("We dont have enough homefry.");
                    //consider throwing a boolean here to track insufficient inventory
                    break;
                }
                //what happens next 
                purchaseCost = sqlData[i].price * quantityToBuy;
                console.log(`Your purchase cost is $${purchaseCost.toFixed(2)}`);

                command = "UPDATE products SET stock_quantity = " + stockFinal + " WHERE item_id = " + sqlData[i].item_id;
                // console.log(command);
                sqlData2 = await sqlPromise(command);

            }
            else if (i===sqlData.length-1){
                //bad shit happens
                console.log("The item is not found. Sorry, not sorry.");
            }
        }
       // console.log(sqlData[idToBuy]);


    } catch(error) {
        console.error(error)
    }
}