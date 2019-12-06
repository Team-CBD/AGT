var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://therundown-therundown-v1.p.rapidapi.com/sports/2/openers/2019-06-17?include=scores&include=all_periods",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
		"x-rapidapi-key": "e0ade11d95mshb80e77a3dfc354cp1c1a92jsn4cc6da73dcc7"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});




//---------Materialize Controls--------------------------

<TopAppBar
title='Any Given Team'
short
navigationIcon={<MaterialIcon
  icon='menu'
  onClick={() => console.log('click')}
/>}
actionItems={[
  <MaterialIcon icon='file_download' />,
  <MaterialIcon icon='print' />,
  <MaterialIcon icon='bookmark' />,
]}
/>
  // Or with jQuery

  $(document).ready(function(){
    $('.datepicker').datepicker();
  });