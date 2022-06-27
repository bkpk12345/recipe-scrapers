const path = require("path");
const { Parser } = require("json2csv");
const fs = require("fs");
const fields = ["title", "serves", "ingredients", "instructions"];
const opts = { fields };

const files = fs.readdirSync("allRecipes/the-Americas-Test-Kitchen");
let filePath = `${__dirname}/allRecipes/the-Americas-Test-Kitchen`;
filePath = path.join(filePath);
console.log(files);
const parser = new Parser(opts);

let allCsvs = files.map(async (file) => {
  let newFilePath = path.join(`${filePath}/${file}`);

  let json = await fs.readFileSync(newFilePath);
  let filename = file.split(".json")[0];
  json = JSON.parse(json);
  const csv = parser.parse(json);
  console.log(csv);
  fs.writeFileSync(`./csvs/${filename}.csv`, csv);
  return csv;
});

Promise.all(allCsvs).then(console.log).catch(console.log);
