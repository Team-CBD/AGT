var dropdown = document.querySelector("#dropFill");
var date = new Date(); //full year month date
var day = String(date.getDate()).padStart(2, '0');
var month = String(date.getMonth() + 1).padStart(2, '0');
var year = date.getFullYear();
var today = year + "-" + month + "-" + day;
console.log(today);
var gameId = "";

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://therundown-therundown-v1.p.rapidapi.com/sports/2/events/" + today,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
		"x-rapidapi-key": "84cbe2eb38msh070a5cb084d0089p1caeebjsn7e60c285acd6"
	}
}

function gameIdGet(event)
{
	var gameId = event.target.id;
	console.log(gameId);
	$.ajax(settings).done(function(response)
	{
		var index = response.events.findIndex(x => x.event_id === gameId);
		console.log(index);
		showTeams(index);
		getScores(gameId);
		$("#drop-fill").hide(5);
		$(".team-banner").show(500);
	});
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
			"x-rapidapi-key": "84cbe2eb38msh070a5cb084d0089p1caeebjsn7e60c285acd6"
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
	$.ajax(settings).done(function(response)
	{
		document.body.innerHTML = document.body.innerHTML.replace("team name 1", response.events[index].teams[0].name);
		document.body.innerHTML = document.body.innerHTML.replace("team name 2", response.events[index].teams[1].name);
		console.log(response);
		console.log(response.events[index].teams[0].is_home);
		if(response.events[index].teams[0].is_home === true)
		{
			document.body.innerHTML = document.body.innerHTML.replace("Info Left", "Home");
			document.body.innerHTML = document.body.innerHTML.replace("Info Right", "Away");
			getLatLon(response.events[index].teams_normalized[0].name, index);
		}
		else
		{
			document.body.innerHTML = document.body.innerHTML.replace("Info Left", "Away");
			document.body.innerHTML = document.body.innerHTML.replace("Info Right", "Home");
			getLatLon(response.events[index].teams_normalized[1].name, index);
		}
	})
	
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
	$.ajax(settings).done(function(response)
	{
		var time = response.events[index].event_date;
		var unixTime = moment(time).unix();
	})
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
			console.log(temperature); //TODO: display current weather on page
		});
}

/*function fillDropDown()
{
	var dropItems = "";
	$.ajax(settings).done(function(response)
	{
		$.each(response.events, function(index,val)
		{
			dropItems += "<br>";
			dropItems += "<br><a class='dropdown-item btn gameTime flow-text grey lighten-4 z-depth-1 black-text' onclick='gameIdGet(event)' id=" + response.events[index].event_id + ">" + val.teams[0].name + " vs. " + val.teams[1].name + "</div>";
			dropItems += "<br>"; 
		});
		$("#dropFill").html(dropItems);
		//console.log(response);
	});
}*/

function fillDropDown()
{
	var dropItems = "";
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/forecast",
		method: "GET",
		data:{
			q: "London",
			appid: "166a433c57516f51dfab1f7edaed8413",
			units: "imperial"
		}
	}).then(function(response){
		console.log(response);
		$.each(response.list, function(index){
			dropItems += "<br>";
			dropItems += "<a class='dropdown-item gameTime btn flow-text grey lighten-4 z-depth-1 black-text' onclick='gameIdGet(event)' id=" + response.list[index].main.temp + ">" + response.list[index].main.temp + "This is some placeholder ass shit, leave it be, thanks, mgmt.</a>";
			dropItems += "<br>";
		});
		$("#dropFill").html(dropItems);
	});
}

subMit.addEventListener("click", function()
{
	fillDropDown();
});