const fs = require("fs");
const csv = require("csv-parse");
const { flag } = require("country-emoji");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "countries-with-flags.csv",
  header: [
    { id: "country", title: "Country" },
    { id: "latitude", title: "Latitude" },
    { id: "longitude", title: "longitude" },
    { id: "name", title: "Name" },
    { id: "flag", title: "Flag" },
  ],
});

const inputFile = "countries.csv";

const countryData = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (data) => countryData.push(data))
  .on("end", () => {
    // remove csv header
    countryData.shift();
    const withFlags = countryData.map((data, index) => {
      return {
        country: data[0],
        latitude: data[1],
        longitude: data[2],
        name: data[3],
        flag: flag(data[0]),
      };
    });
    csvWriter.writeRecords(withFlags).then(() => console.log("The CSV file was written successfully"));
  });
