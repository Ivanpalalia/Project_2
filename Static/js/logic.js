var map = L.map("map", {
    center: [37.4337, -122.4014],
    zoom: 11
  });

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {	
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    //id: "mapbox.streets",
    id: "mapbox/streets-v11", 
    accessToken: API_KEY
}).addTo(map);

var url = "https://datahub.smcgov.org/resource/pjzf-pe8z.json"

d3.json(url, function(response) {

  console.log(response);

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location_2;

    if (location) {
      L.marker([location.coordinates[1], location.coordinates[0]]).addTo(map);
    }
  }

});
