const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
let filePath = path.join(`${__dirname}/../files/ebook5/index.html`);
const { range, flatMap, filter, find } = require("lodash");
let file = fs.readFileSync(filePath);
let start = 10;
let end = 11;
// let end = 18;
const $ = cheerio.load(file);
const chapterranges = range(start, end);
let ctr = 1;
let selector = "h2.section";
let tips = [];
$(selector).each((index, ele) => {
  let ingredient = $(ele.children).attr("alt");
  let ingredientDesc = $(ele).next(".nonindent").text();

  let howTobuyHtml = $(ele).nextAll(".headerb").first();
  let howTobuy = howTobuyHtml.text();

  let howToStorehtml = $(ele).nextAll(".headerb").first().nextAll(".headerb").first();
  let howToStore = howToStorehtml.text();
  let howToStoreDesc = [
    //
    howToStorehtml.next(".nonindent").text(),
    howToStorehtml.next(".nonindent").next(".indent").text(),
    howToStorehtml.next(".nonindent").next(".indent").next(".indent").text(),
  ];
  howToStoreDesc = filter(howToStoreDesc, Boolean);

  let howToUseHtml = $(ele).nextAll(".headerb").first().nextAll(".headerb").first().nextAll(".headerb").first();
  let howToUse = howToUseHtml.text();
  let howToUseDesc = [
    //
    howToUseHtml.next(".nonindent").text(),
    howToUseHtml.next(".nonindent").next(".indent").text(),
    howToUseHtml.next(".nonindent").next("..indent").next(".indent").text(),
  ];
  howToUseDesc = filter(howToUseDesc, Boolean);

  let howTobuyDesc = [];

  howTobuyDesc.push(
    $(ele).next(".nonindent").next(".headerb").next(".nonindent").text(),
    $(ele).next(".nonindent").next(".headerb").next(".nonindent").next(".indent").text(),
    $(ele).next(".nonindent").next(".headerb").next(".nonindent").next(".indent").next(".indent").text(),
    $(ele).next(".nonindent").next(".headerb").next(".nonindent").next(".indent").next(".indent").next(".indent").text()
  );
  howTobuyDesc = filter(howTobuyDesc, Boolean);

  if (!ingredient) {
    ingredient = $(ele.children).next().attr("alt");
  }

  if (ingredient) {
    let chapter = $(ele).parents().prev("h1").next("h1").text();
    let tipObject = {
      //
      ingredient,
      desc: ingredientDesc,
      chapter,
    };
    if (howTobuy == "How to Buy") {
      tipObject = {
        ...tipObject,
        howTobuy,
        howTobuyDesc,
      };
    }
    if (howToStore == "How to Store") {
      tipObject = {
        ...tipObject,
        howToStore,
        howToStoreDesc: howToStoreDesc,
      };
    }
    if (howToUse == "How to Eat" || howToUse == "How to Use") {
      tipObject = {
        ...tipObject,
        howToUse,
        howToUseDesc: howToUseDesc,
      };
    }
    tips.push(tipObject);
  }
});

fs.writeFileSync("../files/tips.json", JSON.stringify(tips, null, 4));
