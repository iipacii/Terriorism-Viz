function renderDashboard(preprocessedData) {
  renderMap(preprocessedData);
  renderTimeline(preprocessedData);
  renderBarChart(preprocessedData);
  renderAnimatedBarChart(preprocessedData);
  renderScatterPlot(preprocessedData);
  renderHeatmap(preprocessedData);
}
