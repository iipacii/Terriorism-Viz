const mapChart = echarts.init(document.getElementById("map"));
// const map = echarts.init(document.getElementById("map"));
let d;

function renderMap(data) {
  console.log("renderMap called with data:", data);
  d = data;
  // Load and register the GeoJSON data
  fetch("data/world.json")
    .then((response) => response.json())
    .then((geoData) => {
      console.log("GeoJSON data loaded:", geoData);
      echarts.registerMap("world", geoData);

      const option = {
        title: {
          text: "Terrorist Attacks Map",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            const data = params.data;
            console.log("Data INSIDE THE OPTION:", params);
            return `
              <div>
                <strong>Country:</strong> ${data.name}<br>
                <strong>City:</strong> ${data.city}<br>
                <strong>Date:</strong> ${data.date}<br>
              
              </div>
            `;
          },
        },
        geo: {
          map: "world",

          roam: false,
          emphasis: {
            label: {
              show: false,
            },
          },
        },
        series: [
          {
            type: "scatter",
            symbolSize: 5,
            coordinateSystem: "geo",
            data: data.map((item) => ({
              name: item.country_txt,
              value: [item.longitude, item.latitude, 1],
              itemStyle: {
                color: "red",
              },
              city: item.city,
              date: item.iyear + "-" + item.imonth + "-" + item.iday,
              summary: item.summary.substring(12),
            })),
          },
        ],
      };

      console.log("Map option created:", option);

      mapChart.setOption(option);

      console.log("Map set with option");
    });
}

console.log("Map chart initialized:", mapChart);

mapChart.on("zoomed", () => {
  const zoomLevel = mapChart.getZoom();
  const center = mapChart.getCenter();
  log("Zoom level:", zoomLevel);
  // Update scatter plot data based on new zoom level and center
  updateScatterPlotData(zoomLevel, center);
});
// Call the renderMap function
// renderMap(yourData); // Replace 'yourData' with the actual data

function updateScatterPlotData(zoomLevel, center) {
  const scatterPlotData = []; // Initialize an empty array to store the updated data
  console.log("Data in updateScatterPlotData:", d);
  // Loop through the original data and update the scatter plot data based on the new zoom level and center
  d.forEach((item) => {
    const longitude = item.longitude;
    const latitude = item.latitude;

    // Check if the point is within the current map view
    if (mapChart.getBounds().contains([longitude, latitude])) {
      scatterPlotData.push({
        name: item.country_txt,
        value: [longitude, latitude, 1],
        itemStyle: {
          color: "red",
        },
      });
    }
  });

  // Update the scatter plot series with the new data
  const scatterPlotSeries = {
    type: "scatter",
    data: scatterPlotData,
  };

  // Update the map with the new scatter plot series
  mapChart.setOption({
    series: [scatterPlotSeries],
  });
}
