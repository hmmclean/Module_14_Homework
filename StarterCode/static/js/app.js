// URL variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch data using D3 library. 
d3.json(url).then(function(samples) {
  // Populate the dropdown with names
  d3.select("#selDataset")
    .selectAll("option")
    .data(samples.names)
    .enter()
    .append("option")
    .text(d=>d)
    .attr("value",d=>d);

  optionChanged(d3.select("#selDataset").property("value"));
});

// sample values, otu_ids, otu_labels
// Initialized arrays
let names = []
let sampleValues = []
let otuIds = []
let otuLabels = []

// For loop to populate arrays
for (let i = 0; i < searchResults.length; i++) {
  row = searchResults[i];
  names.push(row.names);
  sampleValues.push(row.sampleValues);
  otuIds.push(row.otuIds);
  otuLabels.push(row.otuLabels);
}

// Create a horizontal bar chart to display top 10 OTUs found in that individual.
var trace = {
    x: sampleValues.slice(0, 10),  // Take the top 10 values
    y: otuIds.slice(0, 10).map(id => `OTU ${id}`),  // Map OTU ids to labels
    text: otuLabels.slice(0, 10),
    type: 'bar',
    orientation: 'h'
  };
  
  // Create a layout for the chart
  var layout = {
    title: 'Top 10 OTUs per selected individual',
    xaxis: { title: 'Sample Values' },
    yaxis: { title: 'OTU IDs' }
  };
  
  // Create the chart
  Plotly.newPlot('bar', [trace], layout);


// Create a bubble chart that displays each sample. 

// Display the sample metadata.

// Display each key-value pair from the metadata JSON object on the page. 

// Update all the plots when a new sample is selected. 

// BONUS
// Gauge Chart