//dependencies
const express = require("express")
//router modules
	, htmlRoutes = require("./app/routing/html-routes.js")
	, apiRoutes = require("./app/routing/api-routes.js");

//global variables
var port = process.env.PORT || 3000
	, app = express();

//app setup
app.use(express.static("./app/public"));

//Routes
app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(port, function()
{
	console.log("Now listening on port " + port);
});