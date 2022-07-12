const fs = require("fs");
const path = require("path");
const { range, map, startCase, flatMap } = require("lodash");

const scrape = async (file, chapterName, recipe) => {
  let cheerio = require("cheerio");
  let allTutorials = [];
  let $ = cheerio.load(file);

  $("p")
    .next("p")
    .first()
    .each((index, ele) => {
      let description = [$(ele).text().trim()];
      $(ele)
        .nextAll(".topicbody")
        .each((i, e) => {
          description.push($(e).text().trim());
        });
      $(ele)
        .nextAll(".storybody")
        .each((i, e) => {
          description.push($(e).text().trim());
        });

      let stats = [];
      $(ele)
        .nextAll(".recipespecs")
        .each((i, e) => {
          stats.push($(e).text().trim());
        });

      let tools = [];
      $(ele)
        .nextUntil("div.idgenobjectlayout")

        .nextAll("ul.calibre8")

        // .nextAll("")

        .each((i, e) => {
          tools.push($(e).text().trim());
        });

      let ingredients = [];
      $(ele)
        .next("table > tbody")

        .each((i, e) => {
          ingredients.push($(e).text().trim());
        });

      allTutorials.push({
        // title: recipe,
        // chapterName,
        // description,
        // stats,
        // tools,
        ingredients,
      });
    });

  return allTutorials;
};

const getRawHtml = async () => {
  try {
    let allTutorials = [];
    let cheerio = require("cheerio");

    let bookPath = "../files/ebook3/index.html";
    bookPath = path.join(__dirname, bookPath);
    const file = fs.readFileSync(bookPath);

    let $ = cheerio.load(file);
    let ranges = [
      {
        start: 244,
        end: 249,
        chapterName: "How-to-Cook-Eggs",
        recipe: "Eggs Benedict",
      },
      {
        start: 249,
        end: 254,
        chapterName: "How-to-Cook-Eggs",
        recipe: "French Omelets",
      },
      {
        start: 254,
        end: 258,
        chapterName: "How-to-Cook-Eggs",
        recipe: "Cheese Soufflé",
      },
      //   {
      //     start: 310,
      //     end: 311,
      //     fileName: "How-to-Cook-Vegetables",
      //   },
      //   {
      //     start: 363,
      //     end: 364,
      //     fileName: "How-to-Cook-Pasta",
      //   },
      //   {
      //     start: 414,
      //     end: 415,
      //     fileName: "How-to-Cook-Rice-Grains-and-Beans",
      //   },
      //   {
      //     start: 504,
      //     end: 505,
      //     fileName: "How-to-Cook-Meat",
      //   },
      //   {
      //     start: 564,
      //     end: 565,
      //     fileName: "How-to-Cook-Poultry",
      //   },
      //   {
      //     start: 607,
      //     end: 608,
      //     fileName: "How-to-Cook-Seafood",
      //   },
      //   {
      //     start: 637,
      //     end: 638,
      //     fileName: "How-to-grill",
      //   },
      //   {
      //     start: 681,
      //     end: 682,
      //     fileName: "How-to-make-Stocks-and-Soups",
      //   },
      //   {
      //     start: 738,
      //     end: 739,
      //     fileName: "How-to-make-Salad",
      //   },
      //   {
      //     start: 763,
      //     end: 764,

      //     fileName: "How-to-make-Quick-Breads",
      //   },
      //   {
      //     start: 788,
      //     end: 789,
      //     fileName: "How-to-make-Yeast-Breads-and-Pizzas",
      //   },
      //   {
      //     start: 828,
      //     end: 829,
      //     fileName: "How-to-make-Cookies",
      //   },
      //   {
      //     start: 875,
      //     end: 876,
      //     fileName: "How-to-make-Cakes",
      //   },
      //   {
      //     start: 922,
      //     end: 923,
      //     fileName: "How-to-make-Fruit-Desserts",
      //   },
      //   {
      //     start: 955,
      //     end: 956,
      //     fileName: "How-to-make-Pies-and-Tarts",
      //   },
      //   // //
      //   {
      //     start: 991,
      //     end: 992,
      //     fileName: "How-to-make-Custards-Puddings-and-Frozen-Desserts",
      //   },
    ];

    let promises = ranges.map(async (r, index) => {
      let chapterRange = range(r.start, r.end);
      let rawFile = "";
      console.log({
        start: r.start,
        end: r.end,
        chapterName: r.chapterName,
        recipe: r.recipe,
      });
      chapterRange.forEach((chapterR) => {
        let selector = `body > div:nth-child(${chapterR})`;

        let div = $(selector).html();

        rawFile = rawFile.concat(div);
      });

      rawFile = `<div> ${rawFile} </div>`;

      const chapterName = r.chapterName;
      const recipe = r.recipe;
      fs.writeFileSync(`./rawFile.html`, rawFile);

      return await scrape(rawFile, chapterName, recipe);
    });
    let tutorials = await Promise.all(promises);

    allTutorials = [...allTutorials, ...tutorials];
    allTutorials = flatMap(allTutorials);

    let finalTechniquesPath = "../files/tutorials";
    fs.writeFileSync(`${finalTechniquesPath}/allTutorials.json`, JSON.stringify(allTutorials, null, 4));
  } catch (error) {
    console.log(error);
  }
};
getRawHtml().then(console.log).catch(console.log);
