function renderBarChart(data) {
  const formattedData = formatData(data, "barChart");

  const barChart = echarts.init(document.getElementById("bar-chart"));
  // Configure and render the bar chart using formattedData
  // Example:
  const option = {
    // Bar chart configuration options
  };
  barChart.setOption(option);
}
