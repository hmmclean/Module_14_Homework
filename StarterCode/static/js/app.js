// URL variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch data using D3 library. 
d3.json(url).then(function(samplesData) {
  // Populate the dropdown with test subject ids.
  d3.select("#selDataset")
    .selectAll("option")
    .data(samplesData.names)
    .enter()
    .append("option")
    .text(d=>d)
    .attr("value",d=>d);

  optionChanged(d3.select("#selDataset").property("value"));
});

// Create optionChanged master function which will help update each chart when a new value is selected.
function optionChanged(value) {
  d3.json(url).then(function(samplesData) {
    // Metadata Array
    var metadata = samplesData.metadata.filter(data => data.id ==value);
    console.log(metadata);
    // Samples Array
    var subject = samplesData.samples.filter(data => data.id ==value);
    console.log(subject);

    // Arrays for various chart creation.
    // Horizontal Bar Chart
    CreateBar(subject[0].sample_values.slice(0,10).reverse(),
      subject[0].otu_ids.slice(0,10).reverse().map(a=>"OTU "+ a),
      subject[0].otu_labels.slice(0,10).reverse());
    // Bubble Chart
    CreateBubble(subject[0].sample_values,
      subject[0].otu_ids,
      subject[0].otu_labels);
    // Metadata Chart
    CreateMetaData(metadata[0]);
})};

// Create a horizontal bar chart to display top 10 OTUs found in that individual.
function CreateBar(x,y,text) {
  var trace = [{
    x: x,
    y: y,
    text: text,
    type: 'bar',
    orientation: 'h'
  }];
  
  // Create a layout for the chart
  var layout = {
    title: 'Top 10 OTUs per selected individual',
    xaxis: { title: 'Sample Values' },
    yaxis: { title: 'OTU IDs' }
  };
  
  // Create the chart
  Plotly.newPlot('bar', trace, layout);
}

// Create a bubble chart that displays each sample.
function CreateBubble(x,y,text) {
  var traceb = [{
    x: y,
    y: x,
    text: text,
    mode: 'markers',
    marker: {
      size: x,
      color: y.map(_ => getRandomColor())
    }
  }];
  
  // Create a layout for the chart
  var layout = {
    title: 'OTU ID and relative colony size',
    xaxis: { title: 'OTU ID' },
    yaxis: { title: 'Sample Values' },
  };
  
  // Create the chart
  Plotly.newPlot('bubble', traceb, layout);
}

// Function to generate random colors for OTU IDs.
function getRandomColor() {
  var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

// Create metadata panel to display each key-value pair from the metadata JSON object on the page. 
function CreateMetaData(x) {
  var div = d3.select("#sample-metadata");
  div.html("")
  var list = div.append("ul");
  Object.entries(x).forEach(([key,value])=> {
    list.append("li").text(key + ": " + value);
  });
}


// BONUS
// Gauge Chart