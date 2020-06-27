
// const url = "https://datahub.smcgov.org/resource/pjzf-pe8z.json"
// const url = "RestaurantScores.geojson"

//used a cleaned up dataset to test, will connect to database once functionality works
const url = "sf_cleaned_data3.json"


// console.log(restPerZip)

// function init(){
    //grabs reference to the dropdown element
var zipCode = d3.select("#selDataset").on("change", updatePlotly);

function updatePlotly() {
    // // Use D3 to select the dropdown menu
    // var currentSelection = d3.select("#selDataset").node().value;
    // // Assign the value of the dropdown menu option to a variable
    // // var dataset = dropdownMenu.property("selected");

    // // dropdownMenu.property("selected",123);

    // console.log(currentSelection)
    
  
    // //filter should be here
    d3.json(url).then(buildCharts)
}



// d3.select("#selDataset").property("value",123)

function optionChanged(zipCode) {
   
    console.log(zipCode);
    
  }




function buildCharts(data){
// d3.json(url).then( (data) => {

//append list to dropdown
// Object.entries(result).forEach(([key, value]) => {
//     PANEL.append("h5").text(`${key.toUpperCase()}: ${value}`);
//   });
var name_array=[]
var score_array=[]
var restPerZip =[]
var restZip=[]
var restNumb =[]


    //  filter object test
    console.log(data)
    //filter by zip code 
    var zipValue = d3.select("#selDataset").node().value;
    console.log(zipValue)
    function findZip(zip){
        return zip.business_postal_code === zipValue;
    }
    function findTop(top){
        return top.inspection_score > 95;
    }
    function findBottom(bottom){
        return bottom.inspection_score <70;
    }

    var filteredZip = data.filter(findZip);
    var filteredTop = data.filter(findTop);
    var filteredBottom = data.filter(findBottom);

    var filteredBottom2 = filteredBottom.slice(0,19)

    console.log(filteredZip.length);

    //create zipcode array to plot # of restaurants per area

    // var zipArray = ["94110","94103","94102","94109"]
    // zipArray.forEach(element =>
    //     numberRestaurant_1);
    

    
    
    //sort top 20 of filteredZip

    // var Top_filter = filteredZip.sort(function(a, b){return a-b});
    // Top_filter = Top_filter.slice(0,20);

    for (i=0; i<filteredBottom2.length;i++){
        // console.log(filteredBottom2[i].inspection_score)
    }
    
    //
    for (i=0; i< (Object.keys(filteredZip).length);i++) {
        var name = filteredZip[i].business_name;
        var score = filteredZip[i].inspection_score;
        // var risk = data[i].risk_category;
        var postalCode = data[i].business_postal_code;
    
        name_array.push(name)
        score_array.push(score)
        restPerZip.push(postalCode)

        // var filteredZip = data[i].business_postal_code === "94134";
        // console.log(filteredZip)
    }

      
    // determine # of zipcodes create object

    const counts = Object.create(null);

    restPerZip.forEach(element =>
        counts[element] = counts[element] ? counts[element] +1 : 1);
    

    for(i=0; i< (Object.keys(counts).length);i++){    
    restZip.push(Object.keys(counts)[i])
    }

    for(i=0; i< (Object.values(counts).length);i++){

        restNumb.push(Object.values(counts)[i])
    }

    // console.log(counts)
    // console.log(restZip)
    // console.log(restNumb)



    // make bar chart

    var score2 = score_array.slice(0,19)
    var name2 = name_array.slice(0,19)
    console.log(score2)
    console.log(name2)
    
    var graph = [{
        
        // y:filteredBottom2.inspection_score,
        // x:filteredBottom2.business_name,
        y: score2,
        x: name2,
        type: 'bar',
        width: 0.5

        
       
    }];

    var layout = {
        
        title: 'SF Restaurant Scores',
        xaxis: {
          tickangle: -45
        },
        barmode: 'group'
        
      };

     
      
    Plotly.newPlot('bar', graph, layout);

    //create bubble chart 

    //     var bubbleLayout = {
    //         title: "SF Restaurant Scores",
    //         margin: { t: 0 },
    //         hovermode: "closest",
    //         xaxis: { title: "Restaurant Name" },
    //         margin: { t: 100}
    //       };
    //     var bubbleData = [
    //         {
    //         // x: name2,
    //         // y: score2,
    //         x: restZip,
    //         y: restNumb,
    //         text: name,
    //         mode: "markers",
    //         marker: {
    //             size: score2,
    //             color: score2,
    //             colorscale: "Earth"
    //         }
    //     }
    // ];
      
    // Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
// Pie chart test
    var data = [{
        values: restNumb,
        labels: restZip,
        type: 'pie'
      }];

    var layout = {
        title: 'SF Restaurants Per ZIP Code',
        height: 500,
        width: 500
    };
      
    Plotly.newPlot('bubble', data, layout);

   
    
}

d3.json(url).then(buildCharts)

