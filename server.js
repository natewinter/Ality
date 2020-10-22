// Dependencies
const express = require("express");
// Sets port for deploymet and localhost
const PORT = process.env.PORT || 8080;
// Sets up app express
const app = express();
// establishes db for sequelize
const db = require("./models");
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/ality_controllers.js");
app.use(routes);

// Start server with sequelize so that it can begin listening to client requests.
db.sequelize.sync({ force: false }).then(function(){

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
});
