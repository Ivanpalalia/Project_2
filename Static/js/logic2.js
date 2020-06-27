var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {	
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,

    id: "mapbox/streets-v11", 
    accessToken: API_KEY
  });

var layers = {
    High_Risk: new L.LayerGroup(),
    Moderate_Risk: new L.LayerGroup(),
    Low_Risk: new L.LayerGroup(),
    };

var map = L.map("map", {
    center: [37.7740, -122.4194],
    zoom: 11,
    layers: [
        layers.High_Risk,
        layers.Moderate_Risk,
        layers.Low_Risk
    ]
    });

lightmap.addTo(map);

var overlayMaps = {
    "High Risk": layers.High_Risk,
    "Moderate Risk": layers.Moderate_Risk,
    "Low Risk": layers.Low_Risk
    };

L.control.layers(null, overlayMaps).addTo(map);

var info = L.control({
    position: "bottomright"
});

info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

info.addTo(map);
/**
var icons = {

    High_Risk: L.ExtraMarkers.icons({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "red",
        shape: "circle"
    }),
    Moderate_Risk: L.ExtraMarkers.icons({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "yellow",
        shape: "circle"
    }),
    Low_Risk: L.ExtraMarkers.icons({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "green",
        shape: "circle"
    })
};
*/

function getColor(restStatus)

url = "https://data.sfgov.org/resource/pyih-qa8i.json?$where=business_latitude%20%3E%200";

d3.json(url, function(response) {
    var restStatus = response.risk_category;

    var restCount = {
        High_Risk: 0,
        Moderate_Risk: 0,
        Low_Risk: 0,
    };

    var stationStatusCode;

    for (var i = 0; i < response.length; i++) {
        if (restStatus != null) {
            if (restStatus === "High Risk") {
                stationStatusCode = "High_Risk";
            }
            else if(restStatus === "Moderate Risk") {
                stationStatusCode = "Moderate_Risk";
            }
            else {
                stationStatusCode = "Low_Risk";
            }
        }

        restCount[stationStatusCode]++;

        var newMarker = L.marker([response.business_latitude, response.business_longitude], {
            icon: icons[stationStatusCode]
        });

        newMarker.addTo(layers[stationStatusCode]);

        newMarker.bindPopup(response.business_name + "<br> Risk Factor: " + response.risk_category + "<br> address" + response.business_address + "<br> Violation" + response.violation_description);
    }
    updateLegend(restCount);
});

function updateLegend(restCount) {
    document.querySelector(".legend").innerHTML = [
        "<p class='high-risk'>High Risk Restuarants: " + restCount.High_Risk + "</p>",
        "<p class='moderate-risk'>Moderate Risk Restuarants: " + restCount.Moderate_Risk + "</p>",
        "<p class='low-risk'>Low Risk Restuarants: " + restCount.Low_Risk + "</p>",
    ].join("");
}


