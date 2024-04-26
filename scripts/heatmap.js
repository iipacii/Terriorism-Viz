function renderHeatmap(data) {
  const formattedData = formatData(data, "heatmap");

  const heatmap = echarts.init(document.getElementById("heatmap"));
  // Configure and render the heatmap using formattedData
  // Example:
  const option = {
    // Heatmap configuration options
  };
  heatmap.setOption(option);
}
