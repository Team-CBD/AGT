$(document).ready(function(){


	
})
var date = "2019-12-09";
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://therundown-therundown-v1.p.rapidapi.com/sports/2/events/" + date,
	"method": "GET",
	"cnt": "15",
	"headers": {
		"x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
		"x-rapidapi-key": "e0ade11d95mshb80e77a3dfc354cp1c1a92jsn4cc6da73dcc7"
	}
}



function showTeams()
{
	$.ajax(settings).done(function (response) {
		$.each(response.events, function(index, val){
			console.log(val.teams[0].name);
		})
	});
}

showTeams();



