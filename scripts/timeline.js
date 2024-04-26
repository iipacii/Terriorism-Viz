function renderTimeline(data) {
  const formattedData = formatData(data, "timeline");

  const timelineChart = echarts.init(document.getElementById("timeline"));
  // Configure and render the timeline chart using formattedData
  // Example:
  const option = {
    // Timeline chart configuration options
  };
  timelineChart.setOption(option);
}
