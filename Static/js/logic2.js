var satellitemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/satellite-streets-v11",
  accessToken: API_KEY
});
var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {	
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,

    id: "mapbox/streets-v11", 
    accessToken: API_KEY
});

var map = L.map("map", {
    center: [
        37.7740, -122.4194
    ],
    zoom: 12,
    layers: [satellitemap, lightmap]
});

satellitemap.addTo(map);

var baseMaps = {
    Satellite: satellitemap,
    Lightmap: lightmap,
};

url = "https://data.sfgov.org/resource/pyih-qa8i.json?$where=business_latitude%20%3E%200";

d3.json(url, function(data) {
    
    console.log(data);

    var High_Risk_Markers = L.markerClusterGroup();
    var Moderate_Risk_Markers = L.markerClusterGroup();
    var Low_Risk_Markers = L.markerClusterGroup();
    var currentList;
    

    for (var index = 0; index < data.length; index++) {

        var stations = data[index];

        if (stations.risk_category === "High Risk") {
            High_Risk_Markers.addLayer(L.marker([stations.business_latitude, stations.business_longitude])
            .bindPopup("<h2>" + stations.business_name + "</h2><h3>Store Address : " + stations.business_address + "</h3><h3> Risk Factor : " + stations.risk_category + "</h3><h3> Violiation : " + stations.violation_description + "</h3>"));             
        }       
        else if (stations.risk_category === "Moderate Risk") {
            Moderate_Risk_Markers.addLayer(L.marker([stations.business_latitude, stations.business_longitude])
            .bindPopup("<h2>" + stations.business_name + "</h2><h3>Store Address : " + stations.business_address + "</h3><h3> Risk Factor : " + stations.risk_category + "</h3><h3> Violiation : " + stations.violation_description + "</h3>"));
        }
        else if (stations.risk_category === "Low Risk") {
            Low_Risk_Markers.addLayer(L.marker([stations.business_latitude, stations.business_longitude])
            .bindPopup("<h2>" + stations.business_name + "</h2><h3>Store Address : " + stations.business_address + "</h3><h3> Risk Factor : " + stations.risk_category + "</h3><h3> Violiation : " + stations.violation_description + "</h3>"));
        }
    }
    var overlays = {
        "High Risk Restaurants": new L.layerGroup([High_Risk_Markers]),
        "Moderate Risk Restaurants": new L.layerGroup([Moderate_Risk_Markers]),
        "Low Risk Restaurants": new L.layerGroup([Low_Risk_Markers])
    };

    L
    .control
    .layers(baseMaps, overlays)
    .addTo(map);

});