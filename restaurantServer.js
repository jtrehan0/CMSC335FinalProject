// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'd2722e419amshe5ce6c94bdda5c3p106150jsn0ebc67c3223b',
// 		'X-RapidAPI-Host': 'pizza-and-desserts.p.rapidapi.com'
// 	}
// };

// fetch('https://pizza-and-desserts.p.rapidapi.com/pizzas', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


const http = require('http');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

process.stdin.setEncoding("utf8"); /* encoding */
const portNumber = process.argv[2];
console.log(`Web server started and running at http://localhost:${portNumber}`);
const app = express();

  const prompt = "Stop to shutdown the server: ";
  process.stdout.write(prompt);

  process.stdin.on("readable", function () {
    let dataInput = process.stdin.read();
    if (dataInput !== null) {
      let command = dataInput.trim();
      if (command === "stop") {
        process.stdout.write("Shutting down the server\n");
        process.exit(0);
      } else {
        process.stdout.write(`Invalid command: ${command}\n`);
      }
      process.stdout.write(prompt);
      process.stdin.resume();
    }
  });



//setting the view engines
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");
app.get("/", (request, response) => {
    response.render("index");
 });



app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public"));

require("dotenv").config({ path: path.resolve(__dirname, '.env') }) 
const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const db =  process.env.MONGO_DB_NAME;
const mongoCollection = process.env.MONGO_COLLECTION;
const databaseAndCollection = {db: db, collection: mongoCollection};
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${userName}:${password}@cluster0.atgbu6y.mongodb.net/?retryWrites=true&w=majority` ;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get("/order", (request, response) => {
  // store pizzas.json file in pizza variable
  const pizzas = require("./pizzas.json");

  response.render("order", {pizzas});
});




app.listen(portNumber);