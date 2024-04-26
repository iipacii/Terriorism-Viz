let margins = { x: 50, y: 50 };

d3.csv("data/data_sample.csv").then((data) => {
  data = dataMap(data);
  let svg = d3.select("svg");
  let rng = svg
    .attr("viewBox")
    .split(" ")
    .map((d) => parseInt(d));

  let width = rng[2] - rng[0];
  let xRng = [rng[0] + margins.x, rng[2] - margins.x];
  let yRng = [rng[3] - margins.y, rng[1] + margins.y];

  let dateExtent = d3.extent(data, (d) => d.Date);
  let estCostExtend = d3.extent(data, (d) => d.EstimatedCost);
  let actCostExtend = d3.extent(data, (d) => d.ActualCost);
  let sldPriceExtend = d3.extent(data, (d) => d.SoldPrice);
  let profitExtend = d3.extent(data, (d) => d.MarginOfProfit);

  let allExtents = [].concat(
    estCostExtend,
    actCostExtend,
    sldPriceExtend,
    profitExtend
  );

  let overallExtent = d3.extent(allExtents).map((d) => parseInt(d));

  console.log(overallExtent);

  // console.log(data);
  let xScale = d3.scaleTime().domain(dateExtent).range(xRng);
  let yScale = d3.scaleLinear().domain(overallExtent).range(yRng);

  console.log(data.Date);
  let estCostLine = d3
    .line()
    .x((d) => xScale(d.Date))
    .y((d) => yScale(d.EstimatedCost));

  let actCostLine = d3
    .line()
    .x((d) => xScale(d.Date))
    .y((d) => yScale(d.ActualCost));

  let sldCostLine = d3
    .line()
    .x((d) => xScale(d.Date))
    .y((d) => yScale(d.SoldPrice));

  let profitLine = d3
    .line()
    .x((d) => xScale(d.Date))
    .y((d) => yScale(d.MarginOfProfit));

  let fig = svg.append("g");
  fig = fig.data([data]);

  //   console.log("estCostLine:", estCostLine);

  fig.append("path").attr("d", estCostLine).attr("class", "estCost");
  fig.append("path").attr("d", actCostLine).attr("class", "actCost");
  fig.append("path").attr("d", sldCostLine).attr("class", "sldCost");
  fig.append("path").attr("d", profitLine).attr("class", "profit");

  let xAxis = svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${0},${yRng[0]})`)
    .call(d3.axisBottom(xScale));
  let yAxis = svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margins.x},${0})`)
    .call(d3.axisLeft(yScale));

  const legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", "translate(0,50)")
    .selectAll()
    .data([
      { name: "Estimated Cost", class: "LegendEstCost" },
      { name: "Actual Cost", class: "LegendActCost" },
      { name: "Sold Price", class: "LegendSldCost" },
      { name: "Margin of Profit", class: "LegendProfit" },
    ])
    .enter()
    .append("g")
    .attr("class", (d) => d.class)
    .attr("transform", (d, i) => {
      return `translate(${width / 1.2},${i * 20})`;
    });

  legend.append("rect").attr("width", "10px").attr("height", "10px");
  legend
    .append("text")
    .text((d) => d.name)
    .attr("dx", "20px")
    .attr("dy", "10px");

  TableGenerator(data, ".table-container");
  changeFirstRowToTH();
});

function TableGenerator(data, container) {
  const table = d3
    .selectAll(container)
    .append("table")
    .selectAll(".rows")
    .data(data)
    .enter()
    .append("tr")
    .selectAll(".td")
    .data((d, i) => {
      if (i === 0) {
        return Object.keys(d);
      } else {
        return Object.values(d);
      }
    })
    .enter()
    .append("td")
    .text((d) => {
      // console.log(typeof d);
      if (typeof d === "number") {
        return d.toFixed(1);
      } else if (typeof d == "object") {
        console.log(d);
        return d.toDateString();
      } else {
        return d;
      }
    });
}

//a function to change the first row of the table from td to th
function changeFirstRowToTH() {
  d3.selectAll("table")
    .selectAll("tr")
    .filter((d, i) => i === 0)
    .selectAll("td")
    .data((d) => Object.keys(d)) // Use Object.keys to get the headers
    .enter()
    .append("th")
    .text((d) => d);
}

function dataMap(data) {
  //   data = data.filter((d) => !isNaN(d.date) && !isNaN(d.EstimatedCost));
  return data.map((d) => {
    let ActualCost =
      parseInt(d["RawMaterial"]) +
      parseInt(d["Workmanship"]) +
      parseInt(d["StorageCost"]);
    let SoldPrice = parseInt(d["EstimatedCost"]) * 1.1;
    let MarginOfProfit = SoldPrice - ActualCost;
    return {
      Date: new Date(d["date"]),
      EstimatedCost: +d["EstimatedCost"],
      RawMaterial: +d["RawMaterial"],
      Workmanship: +d["Workmanship"],
      YearlyStorage: +d["StorageCost"],
      ActualCost: ActualCost,
      SoldPrice: SoldPrice,
      MarginOfProfit: MarginOfProfit,
    };
  });
}
