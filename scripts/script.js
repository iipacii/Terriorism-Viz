let margins = { x: 50, y: 50 };

d3.csv("data/data_sample(1).csv").then((data) => {
  data = dataMap(data);
  let svg = d3.select("svg");
  let rng = svg
    .attr("viewBox")
    .split(" ")
    .map((d) => parseInt(d));

  let xRng = [rng[0] + margins.x, rng[2] - margins.x];
  let yRng = [rng[3] - margins.y, rng[1] + margins.y];

  let dateExtent = d3.extent(data, (d) => d.Date);
  let estCostExtend = d3.extent(data, (d) => d.EstimatedCost);

  let xScale = d3.scaleTime().domain(dateExtent).range(xRng);
  let yScale = d3.scaleLinear().domain(estCostExtend).range(yRng);

  let estCostLine = d3
    .line()
    .x((d) => xScale(d.Date))
    .y((d) => yScale(d.EstimatedCost));

  let fig = svg.append("g");
  fig = fig.data([data]);

  //   console.log("estCostLine:", estCostLine);

  fig.append("path").attr("d", estCostLine).attr("class", "estCost");

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

  TableGenerator(data, ".table-container");
});

function TableGenerator(data, container) {
  const table = d3
    .selectAll(container)
    .append("Table")
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
    .text((d) => d);
}

function dataMap(data) {
  //   data = data.filter((d) => !isNaN(d.date) && !isNaN(d.EstimatedCost));
  return data.map((d) => {
    let ActualCost = d["RawMaterial"] + d["Workmanship"] + d["StorageCost"];
    let SoldPrice = d["EstimatedCost"] * 1.1;
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
