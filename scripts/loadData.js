function loadExcelData() {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const binary = event.target.result;
      const workbook = XLSX.read(binary, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      resolve(data);
    };

    fileReader.onerror = (error) => reject(error);

    const filePath = "data/dataXXS.xlsx";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", filePath, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        fileReader.readAsBinaryString(new Blob([xhr.response]));
      } else {
        reject(new Error("Error loading data file"));
      }
    };
    xhr.send();
  });
}

loadExcelData()
  .then((data) => {
    // console.log("Data loaded:", data);
    // Data is now loaded as a 2D array
    // You can process the data here or pass it to other functions
    const preprocessedData = preprocessData(data);
    // const preprocessedData = data;
    // console.log("Data preprocessed:", preprocessedData);
    renderDashboard(preprocessedData);
  })
  .catch((error) => console.error("Error loading data:", error));
