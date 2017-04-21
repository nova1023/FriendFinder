//dependencies
const express = require("express")
	, path = require("path")
	, bodyParser = require("body-parser")
	, fs = require("fs")
	, Friends = require(path.join(__dirname, "../data/friends.js"));

//global variables
var router = express.Router();

//setup bodyParser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Routes 
router.get("/api/friends", function(req, res)
{
	Friends.ReadFriends(req, res);
});

router.post("/api/friends", function(req, res)
{
	Friends.LogNewFriend(req, res);
});

module.exports = router;




