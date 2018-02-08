# week-12-hw
week-12-hw

This app's purpose is to allow access to the "products" table in the Bamazon database and have customers choose what products they would like to purchase, how much of said product, and the price that it costed them while simultaneously updating the database to reflect the purchases.

*SEE UPLOADED PNG FILES FOR REFERENCE IN SEQUENTIAL ORDER*

1) Upon running the node server for the server.js file the Inquirer NPM allows the questions are asked "Which product?" and "How much?" is wanted.  The user is showed the database information as a reference point in the log.
2) If the user selects applicable product number and amount, the database updates and lets the user know how much their purchase costs and asks again what product they would like to purchase.
3) If the product ID number is not applicable or the amount of the product is not enough for the request, an error message appears stating so and the user is prompted once again to "Try again".
