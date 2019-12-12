var dropdown = document.querySelector("#dropFill");
var dropdown = document.querySelector("#dropFill");
var cityName = "London";
var date = "2019-12-08";
var gameId = "";
var aaaa = document.querySelector("#dropdownTrigger");

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://therundown-therundown-v1.p.rapidapi.com/sports/2/events/" + date,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
		"x-rapidapi-key": "84cbe2eb38msh070a5cb084d0089p1caeebjsn7e60c285acd6"
	}
}

function gameIdGet(event) //TODO: change so fits with rundown api
{
	var gameId = event.target.id;
	console.log(gameId);
	$.ajax(settings).done(function(response)
	{
		var index = response.events.findIndex(x => x.event_id === gameId);
		console.log(index);
	});
}
//TODO: function that does all the logos and pastes the team scores up

function getLatLon(city)
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
		showWeather(latitude, longitude);
	})
}
 //TODO: get date from user input and pass into darksky
function showWeather(latitude, longitude) //TODO: get latitude and longitude from openweathermap and pass into darksky call
{
	var key = "cdd78f42904565ed23569354e5f2ea6c";
	var time = "1575676800";
	$.ajax(
		{
			crossDomain: true,
			async: true,
			dataType: "jsonp",
			url: "https://api.darksky.net/forecast/" + key + "/" + latitude + "," + longitude + "," + time,
			method: "GET",
		}).then(function(response)
		{
			var temperature = response.currently.apparentTemperature;
			console.log(temperature); //TODO: display current weather on page
		});
}

function fillDropDown()
{
	var dropItems = "";
	$.ajax(settings).done(function(response)
	{
		$.each(response.events, function(index,val)
		{
			dropItems += "<a class='dropdown-item' onclick='gameIdGet(event)' id=" + response.events[index].event_id + ">" + val.teams[0].name + " vs. " + val.teams[1].name + "</div>";
			dropItems += "<br>"; 
		});
		$("#dropFill").html(dropItems);
		console.log(response);
	});
}

/*function fillDropDown()
{
	var dropItems = "";
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/forecast",
		method: "GET",
		data:{
			q: cityName,
			appid: "166a433c57516f51dfab1f7edaed8413",
			units: "imperial"
		}
	}).then(function(response){
		console.log(response);
		$.each(response.list, function(index){
			dropItems += "<a class='dropdown-item' onclick='gameIdGet(event)' id=" + response.list[index].main.temp + ">" + response.list[index].main.temp + "</div>";
			dropItems += "<br>";
		});
		$("#dropFill").html(dropItems);
	});
}*/

dropdownTrigger.addEventListener("click", function()
{
	fillDropDown();
});