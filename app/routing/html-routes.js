//dependencies
const express = require("express")
	, path = require("path");

//global variables
var router = express.Router();

//Routes
router.get("/survey", function(req, res)
{
	res.sendFile(path.join(__dirname, "../public/survey.html"));
});

router.use(function(req, res)
{
	res.sendFile(path.join(__dirname, "../public/home.html"));
});

module.exports = router;
