function preprocessData(data) {
  // Remove rows with any NaN values
  const cleanedData = data.filter((row) => {
    return !row.every((value) => isNaN(value));
  });

  console.log("Cleaned data:", cleanedData);
  // Format the data for the map visualization
  const mapData = cleanedData.map((row) => {
    const columns = [
      "eventid",
      "iyear",
      "imonth",
      "iday",
      "approxdate",
      "extended",
      "resolution",
      "country",
      "country_txt",
      "region",
      "region_txt",
      "provstate",
      "city",
      "latitude",
      "longitude",
      "specificity",
      "vicinity",
      "location",
      "summary",
    ];
    const obj = Object.fromEntries(
      columns.map((column, index) => [column, row[index]])
    );
    return obj;
  });

  return mapData;
}
