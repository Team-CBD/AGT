var dropdown = document.querySelector("#dropFill");
var cityName = "London";
var date = "2019-12-08";
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://therundown-therundown-v1.p.rapidapi.com/sports/2/events/" + date,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
		"x-rapidapi-key": "e0ade11d95mshb80e77a3dfc354cp1c1a92jsn4cc6da73dcc7"
	}
}

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

/*function fillDropDown()
{
	var dropItems = "";
	$.ajax(settings).done(function(response)
	{
		$.each(response.events, function(index,val)
		{
			dropItems += "<a class='dropdown-item' href='#'>" + val.teams[0].name + " vs. " + val.teams[1].name + "</a>";
			dropItems += "<br>"; //TODO: change from bootstrap format to materialize
		});
		$("#dropFill").html(dropItems);
		console.log(response);
	});
}*/

dropdown.addEventListener("click", function()
{
	fillDropDown();
});