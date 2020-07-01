
//define data set
url = "http://localhost:5000/getallbusiness"

//grabs reference to the dropdown element and updates chart and table based on change
var zipCode = d3.select("#selDataset").on("change", updatePlotly);

function updatePlotly() {  
    d3.json(url).then(buildCharts)
}


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
    
    var filteredZip = data.filter(findZip);
    
    console.log(filteredZip.length);

    
    
    // pushes name,score and postalCode to new arrays
    for (i=0; i< (Object.keys(filteredZip).length);i++) {
        var name = filteredZip[i].business_name;
        var score = filteredZip[i].inspection_score;
        var postalCode = data[i].business_postal_code;
    
        name_array.push(name)
        score_array.push(score)
        restPerZip.push(postalCode)  
    }
      
    // creates an object for the # of unique zipcodes 

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



    // makes the bar chart
    //limits to only 100 data points

    var score2 = score_array.slice(0,100)
    var name2 = name_array.slice(0,100)
    // console.log(score2)
    // console.log(name2)
    
    var graph = [{
        
        y: score2,
        x: name2,
        type: 'bar',
        width: 0.5
  
    }];

    var layout = {
        
        title: 'SF Restaurant Scores',
        yaxis:{
          automargin: true
        },
        xaxis: {
          tickangle: -45
        },
        barmode: 'group'
        
      };

     
      
    Plotly.newPlot('bar', graph, layout);

    
  //Creates a table with description of violation,name, health score, etc.. based on zipcode

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


//----extra
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
    