function userForm()
{
	// ensure each field has a value
	for (var index = 0; index < document.forms[0].length - 1; index++)
	{
		if (document.forms[0][index].value === "")
		{
			alert("Please fill in all fields before submitting.");
			return false;
		}
	}
	//only reached if all fields have values
	return true;
}

function makeNewFriend()
{
	//construct the friend object
	var newFriend = 
	{
		name: document.forms[0][0].value,
		imageLink: document.forms[0][1].value,
		scores: []
	};

	//push scores into scores property array of friend object
	for (var index = 2; index < document.forms[0].length - 1; index++)
		newFriend.scores.push(parseInt(document.forms[0][index].value));

	return newFriend;
}

$("#submit-form").on("click", function(event)
{
	event.preventDefault();

	var formFilled = userForm();

	if (formFilled && !$(this).hasClass("disabled"))
	{
		var newFriend = makeNewFriend();

		$(this).addClass("disabled");

		//post the newFriend to the API path
		$.post("/api/friends", newFriend).done(function(data)
		{
			if (parseInt(data) === -1)
			{
				//Indicate that user is the first friend in the log
				$("#match-name").html("You're the frist friend here!");
				$("#match-picture").attr("src", newFriend.imageLink);
				$("#match-picture").attr("alt", newFriend.name + " picture");

				//display the modal
				$("#match-modal").modal("toggle");
			}
			else //display the match
			{
				//pull the values from the object, and assign to modal
				$("#match-name").html(data.name);
				$("#match-picture").attr("src", data.imageLink);
				$("#match-picture").attr("alt", data.name + " picture");

				//display the modal
				$("#match-modal").modal("toggle");
			}
		});
	}
});







