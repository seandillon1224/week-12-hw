var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});




function start() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([{
          name: "whichID",
          type: "input",
          message: "Which item would you like to purchase?"
        },
        {
          name: "howMuch",
          type: "input",
          message: "How much of this item?"

        }
      ])
      .then(function (answer) {
        var chosenItem;
        //set chosenItem variable to the correct item id
        chosenItem = res[answer.whichID-1]


        if (chosenItem.item_id == answer.whichID && chosenItem.stock_quantity >= answer.howMuch) {
          connection.query(
            "UPDATE products SET ? WHERE ?", [{
                stock_quantity: chosenItem.stock_quantity - answer.howMuch
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Updated our database!");
              console.log("Your total cost is: " + (answer.howMuch * chosenItem.price))
              start();
            }
          );
        } else {
          console.log("Not a valid id and/or stock amount, try again!")
          start();
        }
      });
  });
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(`
      ID Number: ${res[i].item_id} | 
      Product name: ${res[i].product_name} | 
      Department name: ${res[i].department_name} | 
      Price ($): ${res[i].price} | 
      Stock Quantity: ${res[i].stock_quantity}`);
    }
  });
  start();
}