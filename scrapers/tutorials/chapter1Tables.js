const { range, startCase, flatMap, isEmpty } = require("lodash");
const path = require("path");
const fs = require("fs");
let cheerio = require("cheerio");
let filePath = path.join(`${__dirname}/../files/ebook3/index.html`);
console.log({ filePath });
let file = fs.readFileSync(filePath);
let $ = cheerio.load(file);
let tables = [];
$("h3.calibre1").each((index, ele) => {
  let title = $(ele).text().trim();

  if (title.includes("Troubleshooting ")) {
    let tableHtml = $(ele).next("table.troubleshooting-table").toString();
    $ = cheerio.load(tableHtml);
    tableHtml = $("tbody").toString().trim();

    // $ = cheerio.load(tableHtml);

    let trs = [];
    $("tbody > tr").each((ind, tr) => {
      $(tr).each((i, sib) => {
        let txt = $(sib).text();
        txt = txt.split("\n\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t");
        console.log(txt.length);
        if (txt.length == 1) {
          txt = txt.join("");
          txt = txt.split("\n\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t");
        }
        let problem = txt[0].trim();
        let solution = txt[1].trim();
        if (problem != "PROBLEM") {
          trs.push({
            problem: problem,
            solution: solution,
          });
        }
      });
    });
    if (!isEmpty(trs)) {
      tables.push({
        title: $(ele).text().trim(),
        table: JSON.stringify(trs),
      });
    }
  }
});

fs.writeFileSync("../files/chapter1/tables.json", JSON.stringify(tables, null, 4));
