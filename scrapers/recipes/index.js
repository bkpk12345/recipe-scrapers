const fs = require("fs");
const path = require("path");
const { range } = require("lodash");

let recipes = [];

const scrape = async (file, fileName, index) => {
  console.log({ index });
  let cheerio = require("cheerio");
  fs.writeFileSync(`./rawH/${fileName}.html`, file);
  let $ = cheerio.load(file);
  let h2 = $("h2.calibre4");

  h2.each((index, ele) => {
    let instructions = [];
    $(ele) //
      .next()
      .next()
      .next()
      .nextUntil("p.recipeyield")
      .each((idx, el) => {
        let filter = $(el).hasClass("storybody");
        if (filter) {
          let text = $(el).text().trim();

          instructions.push(text);
        }
      })
      .text();

    let allIngredients = [];
    $(ele) //
      .nextUntil(".recipetable")
      .next(".recipetable")
      .each((ind, ingredients) => {
        let ings = [];

        $(ingredients).each((idx, child) => {
          let tbody = $(child).find("tbody.calibre11");

          let trs = tbody.children("tr").each((i, tr) => {
            let text = $(tr) //
              .text()
              .trim()
              .replace(/\n/, " ")
              .replace(/\n/g, "")
              .replace(/\t/g, "")

              .replaceAll("\n\n        \n        \n          ", " ")
              .replaceAll("\n\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t", " ")
              .replace(/\n/g, " ")
              .replace(/\n\t\t\t\t/g, " ");
            text = text.replace(/\n/, " ");
            text = text.replace(/\n/g, "");
            text = text.replace(/\t/, " ");
            text = text.replace(/\t/g, "");

            ings.push(text);
          });
        });
        allIngredients = [...ings, ...allIngredients];
      });

    recipes.push({
      title: $(ele).text(),
      "WHY THIS RECIPE WORKS": $(ele).next("p.fmquote").text().trim(),
      serves: $(ele).next("").next("").next(".recipeyield").text().trim(),
      tip: $(ele).next("").next("").next("").next("p.fmquote").text().trim(),
      ingredients: JSON.stringify(allIngredients),
      instructions: JSON.stringify(instructions),
      // variations: "",
    });
  });
  $ = null;
  let finalRecipesPath = "../files/finalrecipes";
  fs.writeFileSync(`${finalRecipesPath}/${fileName}.json`, JSON.stringify(recipes, null, 4));
  return null;
};

const getRawHtml = async () => {
  try {
    let cheerio = require("cheerio");
    let bookPath = "./../files/ebook3/index.html";
    bookPath = path.join(__dirname, bookPath);
    const file = fs.readFileSync(bookPath);

    let $ = cheerio.load(file);
    let ranges = [
      // {
      //   start: 259,
      //   end: 260,
      //   fileName: "How-to-Cook-Eggs",
      // },
      // {
      //   start: 326,
      //   end: 327,
      //   fileName: "How-to-Cook-Vegetables",
      // },
      // {
      //   start: 389,
      //   end: 390,
      //   fileName: "How-to-Cook-Pasta",
      // },
      // {
      //   start: 430,
      //   end: 431,
      //   fileName: "How-to-Cook-Rice-Grains-and-Beans",
      // },
      // {
      //   start: 540,
      //   end: 541,
      //   fileName: "How-to-Cook-Meat",
      // },
      // {
      //   start: 591,
      //   end: 592,
      //   fileName: "How-to-Cook-Poultry",
      // },
      // {
      //   start: 623,
      //   end: 624,
      //   fileName: "How-to-Cook-Seafood",
      // },
      // {
      //   start: 663,
      //   end: 664,
      //   fileName: "How-to-grill",
      // },
      {
        // /html/body/div[702]
        // /html/body/div[703]
        start: 702,
        end: 703,
        fileName: "How-to-make-Stocks-and-Soups",
      },
      // {
      //   start: 754,
      //   end: 755,
      //   fileName: "How-to-make-Salad",
      // },
      // {
      //   start: 776,
      //   end: 777,
      //   fileName: "How-to-make-Quick-Breads",
      // },
      // {
      //   start: 804,
      //   end: 805,
      //   fileName: "How-to-make-Yeast-Breads-and-Pizzas",
      // },
      // {
      //   start: 851,
      //   end: 852,
      //   fileName: "How-to-make-Cookies",
      // },
      // {
      //   start: 897,
      //   end: 898,
      //   fileName: "How-to-make-Cakes",
      // },
      // {
      //   start: 938,
      //   end: 939,
      //   fileName: "How-to-make-Fruit-Desserts",
      // },
      // {
      //   start: 971,
      //   end: 972,
      //   fileName: "How-to-make-Pies-and-Tarts",
      // },
      // //
      // {
      //   start: 1007,
      //   end: 1008,
      //   fileName: "How-to-make-Custards-Puddings-and-Frozen-Desserts",
      // },
      // {
      //   start: 971,
      //   end: 972,
      //   fileName: "How-to-make-Pies-and-Tarts",
      // },
    ];
    console.log({ "before-length": ranges.length });
    for (let index = 0; index < ranges.length; index++) {
      let r = ranges[index];

      console.log({ r, index });
      // let selector1 = `body > div:nth-child(${r.start}) > div`;
      // let selector2 = `body > div:nth-child(${r.end}) > div`;

      let selector1 = `body > div:nth-child(${r.start})`;
      let selector2 = `body > div:nth-child(${r.end})`;

      console.log({ selector1, selector2 });
      let div1 = $(selector1).html();
      let div2 = $(selector2).html();
      let rawFile = "<div>" + div1 + div2 + "</div>";
      const fileName = r.fileName;
      fs.writeFileSync(`../files/rawHtml/${fileName}.html`, rawFile);
      let newFile = fs.readFileSync(`../files/rawHtml/${fileName}.html`);
      await scrape(newFile, fileName, index);
    }
    console.log("after");

    // let promises = ranges.map(async (r) => {
    //   let selector1 = `body > div:nth-child(${r.start}) > div`;
    //   let selector2 = `body > div:nth-child(${r.end}) > div`;
    //   let div1 = $(selector1).html();
    //   let div2 = $(selector2).html();
    //   let rawFile = "<div>" + div1 + div2 + "</div>";
    //   const fileName = r.fileName;
    //   fs.writeFileSync(`../files/rawHtml/${fileName}.html`, rawFile);
    //   let newFile = fs.readFileSync(`../files/rawHtml/${fileName}.html`);
    //   return await scrape(newFile, fileName);
    // });
    // await Promise.all(promises);
    $ = null;
    cheerio = null;
  } catch (error) {
    console.log(error);
  }
};
getRawHtml().then(console.log).catch(console.log);
