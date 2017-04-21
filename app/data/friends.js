const fs = require("fs")
	, path = require("path");

exports.ReadFriends = function(req, res)
{
	//read all friend objects stored in log file
	fs.readFile(path.join(__dirname, "./logs.log"), "utf8", function(error, data)
	{
		if (error)
		{
			throw error;
		}

		//split each object into its own element in an array
		var friendsString = data.split("\n");
		friendsString.pop();

		//fill the allFriends array with parsed friend objects
		var allFriends = [];
		for (var i = 0; i < friendsString.length; i++)
			allFriends.push(JSON.parse(friendsString[i]));

		res.json(allFriends);
	});
};

exports.LogNewFriend = function (req, res)
{
	var newFriend = req.body;
	//convert the score values to numbers
	for (var i = 0; i < newFriend.scores.length; i++)
		newFriend.scores[i] = parseInt(newFriend.scores[i]);

	//stringify the object, and log it to the friends log file
	var newFriendString = JSON.stringify(newFriend) + "\n";

	fs.appendFile(path.join(__dirname, "./logs.log"), newFriendString, function(error)
	{
		if (error)
		{
			throw error;
		}

		fs.readFile(path.join(__dirname, "./logs.log"), "utf8", function(error, data)
		{
			if (error)
			{
				throw error;
			}

			//split each object into its own element in an array. Still a string
			var friendsString = data.split("\n");
			friendsString.pop();

			//fill the allFriends array with parsed friend objects
			var allFriends = [];
			for (var i = 0; i < friendsString.length; i++)
				allFriends.push(JSON.parse(friendsString[i]));

			//store the most compatible friend
			var bestMatch = FindCompatibleFriend(newFriend, allFriends);

			if (bestMatch === -1)
				res.send(bestMatch.toString());
			else
				res.send(bestMatch);
		});
	});
};

function FindCompatibleFriend(newFriend, allFriends)
{
	
	if (allFriends.length === 1)
		return -1; //only 1 friend in log, the one who just submitted the survey

	var bestMatchi;
	var minDifference = 1000;

	//go through array of all friends (-1 since newFriend is last element in array)
	for (var index = 0; index < allFriends.length - 1; index++)
	{
		var totalDifference = 0;

		//compare scores of newFriend to currentFriend
		for (var i = 0; i < newFriend.scores.length; i++)
		{
			var singleDifference = newFriend.scores[i] - allFriends[index].scores[i];

			if (singleDifference < 0) //absolute value of difference
				totalDifference += singleDifference * -1;
			else
				totalDifference += singleDifference;
		}

		if (totalDifference < minDifference)
		{
			//store i of currentFriend
			bestMatchi = index;
			//update minDifference
			minDifference = totalDifference;
		}
	}
	//return the best matching friend object
	return allFriends[bestMatchi];
};