// URL variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch data using D3 
d3.json(url).then(function(data) {
    console.log(data);
});

// Create a horizontal bar chart to display top 10 OTUs found in that individual. 
// sample values, otu_ids, otu_labels

// Create a bubble chart that displays each sample. 

// Display the sample metadata.

// Display each key-value pair from the metadata JSON object on the page. 

// Update all the plots when a new sample is selected. 

// BONUS
// Gauge Chart