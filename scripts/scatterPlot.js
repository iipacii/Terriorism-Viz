function renderScatterPlot(data) {
  const formattedData = formatData(data, "scatterPlot");

  const scatterPlot = d3
    .select("#scatter-plot")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  // Configure and render the scatter plot using formattedData
  // Example:
  const xScale = d3.scaleLinear().range([
    /* x range */
  ]);
  const yScale = d3.scaleLinear().range([
    /* y range */
  ]);

  // Create the scatter plot points
  // ...
}
