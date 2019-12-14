var dropdown = document.querySelector("#dropFill");
var date = new Date(); //full year month date
var day = String(date.getDate()).padStart(2, '0');
var month = String(date.getMonth() + 1).padStart(2, '0');
var year = date.getFullYear();
var today = "2019-12-15"; //year + "-" + month + "-" + day;
console.log(today);
var city = "Baltimore";
var gameId = "";
var rundownAPIkey = "afbd06620amshd8f0c0962c6e84bp1e8773jsn7e85a0219911"; //<=#4 //"a0f94d59d3msh5288a8373770889p1430d2jsn2fb820f83154"; // <= deri's 3rd key

var theRundownData = [];

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://therundown-therundown-v1.p.rapidapi.com/sports/2/events/" + today,
	"method": "GET",
	"dataType": "json",
	"headers": {
		"x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
		"x-rapidapi-key": rundownAPIkey
	}
}

$.ajax(settings).done(function(data){
	theRundownData.push(data);
	console.log(data);
	console.log(theRundownData[0]);
});


function gameIdGet(event)
{
	var gameId = event.target.id;
	console.log("gameId: " + gameId);
	
		var index = theRundownData[0].events.findIndex(x => x.event_id === gameId);
		console.log("Index: " + index);
		showTeams(index);
		getScores(gameId);
		
		
		//$(".drop-fill").hide(5);
		//$(".team-banner").show(500);
	
}
//TODO: function that does all the logos and pastes the team scores up

function getScores(gameId)
{
	var something = {
		"async": true,
		"crossDomain": true,
		"url": "https://therundown-therundown-v1.p.rapidapi.com/events/" + gameId + "?include=all_periods&include=scores",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
			"x-rapidapi-key": rundownAPIkey
		}
	}
	
	$.ajax(something).done(function (response) {
		var homeScore = response.score.score_home;
		var awayScore = response.score.score_away;
		var homeTeam = "";
		var awayTeam = "";
		if(response.teams[0].is_home === true)
		{
			homeTeam = response.teams[0].name;
			awayTeam = response.teams[1].name;
		}
		else
		{
			homeTeam = response.teams[1].name;
			awayTeam = response.teams[0].name
		}

		if(response.event_status === "STATUS_FINAL")
		{
			if(homeScore > awayScore)
			{
				console.log(homeTeam + "wins");
				if(homeTeam === response.teams[0].name)
				{
					console.log(homeScore + " - " + awayScore);
				}
				else
				{
					console.log(awayScore + " - " + homeScore);
				}
			}
			else
			{
				console.log(awayTeam + "wins");
				if(homeTeam === response.teams[0].name)
				{
					console.log(homeScore + " - " + awayScore);
				}
				else
				{
					console.log(awayScore + " - " + homeScore);
				}
			}
		}
		else
		{
			console.log(homeScore + " - " + awayScore);
		}
	});
}

function showTeams(index)
{
	$("#dropFill").hide();
	$("#team-banner").show();
	console.log("gameTime clicked");

	var logoLeftDiv = $("#team-logo-left");
	var logoRightDiv = $("#team-logo-right");

	var imgSrc = "assets/img/";
	var logoLeft = theRundownData[0].events[index].teams_normalized[0].mascot.toLowerCase();
	var logoRight = theRundownData[0].events[index].teams_normalized[1].mascot.toLowerCase();

	console.log(theRundownData[0].events[index].teams_normalized[0].mascot.toLowerCase());
	console.log("src", imgSrc + logoLeft + ".gif");

	$("<img>").attr("src", imgSrc + logoLeft + ".gif").attr("alt", logoLeft + "Logo").prependTo(logoLeftDiv);
	$("<img>").attr("src", imgSrc + logoRight + ".gif").attr("alt", logoRight + "Logo").prependTo(logoRightDiv);

	document.body.innerHTML = document.body.innerHTML.replace("team name 1", theRundownData[0].events[index].teams[0].name);
	document.body.innerHTML = document.body.innerHTML.replace("team name 2", theRundownData[0].events[index].teams[1].name);
	
	console.log("Are the " + theRundownData[0].events[index].teams[0].name + " at home? - " + theRundownData[0].events[index].teams[0].is_home);
	
	if(theRundownData[0].events[index].teams[0].is_home === true)
	{
		document.body.innerHTML = document.body.innerHTML.replace("Info Left", "Home");
		document.body.innerHTML = document.body.innerHTML.replace("Info Right", "Away");
		//getLatLon(theRundownData[0].events[index].teams_normalized[0].name, index);
		getLatLon(city, index);
	}
	else
	{
		document.body.innerHTML = document.body.innerHTML.replace("Info Left", "Away");
		document.body.innerHTML = document.body.innerHTML.replace("Info Right", "Home");
		//getLatLon(theRundownData[0].events[index].teams_normalized[1].name, index);
		getLatLon(city, index);
	}
	
	
}

function getLatLon(city, index)
{
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/forecast",
		method: "GET",
		data: {
			q: city,
			appid: "166a433c57516f51dfab1f7edaed8413",
			units: "imperial"
		}
	})
	.then(function(response)
	{
		var latitude = response.city.coord.lat;
		var longitude = response.city.coord.lon;
		showWeather(latitude, longitude, index);
	})
}

function showWeather(latitude, longitude, index)
{
	var key = "cdd78f42904565ed23569354e5f2ea6c";
	
		var time = theRundownData[0].events[index].event_date;
		var unixTime = moment(time).unix();
	
	$.ajax(
		{
			crossDomain: true,
			async: true,
			dataType: "jsonp",
			url: "https://api.darksky.net/forecast/" + key + "/" + latitude + "," + longitude + "," + unixTime,
			method: "GET",
		}).then(function(response)
		{
			var temperature = response.currently.apparentTemperature;
			console.log("temp: " + temperature); //TODO: display current weather on page
		});
}


function fillDropDown()
{
var dropItems = "";

	$.each(theRundownData[0].events, function(index,val)
	{
		//dropItems += "<br>";
		//dropItems += "<br><a class='dropdown-item btn carousel-item gameTime flow-text grey lighten-4 z-depth-1 black-text' onclick='gameIdGet(event)' id=" + theRundownData[0].events[index].event_id + ">" + val.teams[0].name + " vs. " + val.teams[1].name + "</div>";
		//dropItems += "<br>";
		dropItems += "<div onclick='gameIdGet(event)' class='carousel-item' id=" + theRundownData[0].events[index].event_id + ">";
		dropItems += "<div class='card white card-bkg row'>";
		  dropItems += "<div>";
			dropItems += "<div>";
			  dropItems += "<h4 class='black-text center card-title'><time datetime='2019-12-15T10:00:00-08:00'>12/15</time></h4>";
			  dropItems += "</div>";
			  dropItems += "<div>";
				dropItems += "<h5 class='center grey-text'><time datetime='2019-12-15T10:00:00-08:00'>10:00am</time></h5>";
				dropItems += "</div>";
				dropItems += "</div>";
				  
				dropItems += "<div class='card col s6'>";
				  dropItems += "<div class='logo-small logo-nfl' id='logo-nfl-phi'>";
					dropItems += "<div class='team-name'>TEST" + val.teams[0].name + ";"
					 dropItems += "<span class='center'>PHI </span>";
					  dropItems += "<img class='center team-mascot' src='assets/img/eagles.gif'>";
					  dropItems += "</div>";
					  dropItems += "<div class='center team-score'></div>";
					  dropItems += "<div class='center team-record'>(6-7)</div>";
					  dropItems += "</span>";
					  dropItems += "</div>";
					  dropItems += "</div>";

					  dropItems += "<div class='card col s6'>";
						dropItems += "<div class='logo-small logo-nfl' id='logo-nfl-wsh'><span>";
						  dropItems += "<div class='center team-name'>" + val.teams[1].name + ";"
							dropItems += "<span class='center'>WSH </spanclass='center'>";
							  dropItems += "<span class='center team-mascot'><img class='team-mascot' src='assets/img/redskins.gif'></span>";
							  dropItems += "</div>";
							  dropItems += "<div class='center team-score'></div>";
							  dropItems += "<div class='center team-record'>(3-10)";
								dropItems += "</div>";
								dropItems += "</span>";
								dropItems += "</div>";
					  
								dropItems += "</div>";
								dropItems += "</div>";
								dropItems += "</div>";

	});
	$("#dropFill").html(dropItems);
	
}


paypal.Buttons({
	style: {
		shape: 'pill',
		color: 'gold',
		layout: 'vertical',
		label: 'pay',
		
	},
	createOrder: function(data, actions) {
		return actions.order.create({
			purchase_units: [{
				amount: {
					value: '1'
				}
			}]
		});
	},
	onApprove: function(data, actions) {
		return actions.order.capture().then(function(details) {
			alert('Transaction completed by ' + details.payer.name.given_name + '!');
		});
	}
}).render('#paypal-button-container');


    //<!--  Below is the transition flow for the frontend. When one element is used, it hides and brings in the next-->
 

	//---Hide n Seek------
$(document).ready(function(){
	$("#subMit").click(function(e) 
	{
		event.preventDefault();
		// Get input name
		var eMail = $("#email_inline").val();
			// Store data
			localStorage.setItem("email_inline", eMail);
			document.getElementById("email-output1").innerHTML = localStorage.getItem("email_inline");
			console.log("Your e-mail is saved:" + eMail);
			$("#qr-banner").hide();
			$("#email-area").hide();
			$(".drop-fill").show()
		    // carousel activation
			$('.carousel').carousel();
			fillDropDown();
	});

	$("#paypal-button-container").hide();
	$(".tShirts").hide();
	$(".drop-fill").hide();
	$("#team-banner").hide();

	// $(".gameTime").click(function(e)
	// {
	// 	//event.preventDefault();
	// 	$(".drop-fill").hide();
	// 	$("#team-banner").show();
	// 	console.log("gameTime clicked");
	// });

	$("#left-team").click(function(e)
	{
		//event.preventDefault();
		$("#team-banner").hide();
		$(".tShirts").show();
		$("#leftT-shirt").hide();
		$("#rightT-shirt").show();
		$("#paypal-button-container").show();
		console.log("left-team clicked");
	});
	
	$("#right-team").click(function(e)
	{
	//event.preventDefault();
	$("#team-banner").hide();
	$(".tShirts").show();
	$("#rightT-shirt").hide();
	$("#leftT-shirt").show();
	$("#paypal-button-container").show();
	console.log("right-team clicked");
	});
	

});

 
