
// const url = "https://datahub.smcgov.org/resource/pjzf-pe8z.json"
// const url = "RestaurantScores.geojson"

//used a cleaned up dataset to test, will connect to database once functionality works
const url = "sf_cleaned_data3.json"


// console.log(restPerZip)

// function init(){
    //grabs reference to the dropdown element
var zipCode = d3.select("#selDataset").on("change", updatePlotly);

function updatePlotly() {
  
    d3.json(url).then(buildCharts)
}


// d3.select("#selDataset").property("value",123)

function optionChanged(zipCode) {
   
    console.log(zipCode);
    
  }


function buildCharts(data){

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
    // function findTop(top){
    //     return top.inspection_score > 95;
    // }
    // function findBottom(bottom){
    //     return bottom.inspection_score <70;
    // }

    var filteredZip = data.filter(findZip);
    // var filteredTop = data.filter(findTop);
    // var filteredBottom = data.filter(findBottom);
    // var filteredBottom2 = filteredBottom.slice(0,19)

    console.log(filteredZip.length);

    
    
    //sort top 20 of filteredZip

    // var Top_filter = filteredZip.sort(function(a, b){return a-b});
    // Top_filter = Top_filter.slice(0,20);

    // for (i=0; i<filteredBottom2.length;i++){
    //     // console.log(filteredBottom2[i].inspection_score)
    // }
    
    //
    for (i=0; i< (Object.keys(filteredZip).length);i++) {
        var name = filteredZip[i].business_name;
        var score = filteredZip[i].inspection_score;
        var postalCode = data[i].business_postal_code;
    
        name_array.push(name)
        score_array.push(score)
        restPerZip.push(postalCode)

       
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

    var score2 = score_array.slice(0,100)
    var name2 = name_array.slice(0,100)
    // console.log(score2)
    // console.log(name2)
    
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
    // var data = [{
    //     values: restNumb,
    //     labels: restZip,
    //     type: 'pie'
    //   }];

    // var layout = {
    //     title: 'SF Restaurants Per ZIP Code',
    //     height: 500,
    //     width: 500
    // };
      
    // Plotly.newPlot('bubble', data, layout);

    //Details table

   //clears table data 

    tbody.html("");

    // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  filteredZip.forEach((dataRow) => {
    // Append a row to the table body
    const row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
        cell.text(val);
      }
    );
  });


    
}

const tbody = d3.select("tbody");

d3.json(url).then(buildCharts)

