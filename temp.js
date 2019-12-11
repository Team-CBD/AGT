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
var key = "cdd78f42904565ed23569354e5f2ea6c";
var latitude= "42.3601";
var longitude = "-71.0589";
var time = "1575676800"; //TODO: get date from user input and pass into darksky
function showWeather() //TODO: get latitude and longitude from openweathermap and pass into darksky call
{
	$.ajax(
		{
			crossDomain: true,
			async: true,
			dataType: "jsonp",
			url: "https://api.darksky.net/forecast/" + key + "/" + latitude + "," + longitude + "," + time,
			method: "GET",
		}).then(function(response)
		{
			console.log(response); //TODO: display current weather on page
		});
}
showWeather();

function fillDropDown()
{
	var dropItems = "";
	$.ajax(settings).done(function(response)
	{
		$.each(response.events, function(index,val)
		{
			dropItems += "<a class='dropdown-item' href='#'>" + val.teams[0].name + " vs. " + val.teams[1].name;
			dropItems += "</a>"; //TODO: change from bootstrap format to materialize
		});
		$("#menu").html(dropItems);
	});
}