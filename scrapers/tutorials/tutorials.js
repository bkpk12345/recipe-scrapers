const fs = require("fs");
const path = require("path");
const { range, map, startCase, flatMap } = require("lodash");

const scrape = async (file, fileName) => {
  let allTechniques = [];
  let cheerio = require("cheerio");

  let $ = cheerio.load(file);
  let h2 = $("div.idgenobjectlayout > h2.calibre4").last();

  h2.each((index, ele) => {
    let desc = [];

    $(ele) //
      .each((i, e) => {
        title = $(e).val();
      });

    allTechniques.push({
      title,
      // category,
      // equipments,
      // steps,
      // chapter: startCase(fileName),
      // book: startCase("The americas test kitchen"),
      // description: desc,
    });
  });

  return allTechniques;
};

const getRawHtml = async () => {
  try {
    let allTutorials = [];
    let cheerio = require("cheerio");

    let bookPath = "./../../files/ebook3/index.html";
    bookPath = path.join(__dirname, bookPath);
    const file = fs.readFileSync(bookPath);

    let $ = cheerio.load(file);
    let ranges = [
      {
        start: 243,
        end: 258,
        fileName: "How-to-Cook-Eggs",
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
      let chapterRange = range(r.start, r.end + 1);
      let rawFile = "";
      chapterRange.forEach((chapterR) => {
        let selector = `body > div:nth-child(${chapterR})`;

        let div = $(selector).html();

        rawFile = rawFile.concat(div);
      });

      rawFile = `<div> ${rawFile} </div>`;

      const fileName = r.fileName;
      fs.writeFileSync(`./rawFile.html`, rawFile);

      return await scrape(rawFile, fileName, index);
    });
    let tutorials = await Promise.all(promises);

    allTutorials = [...allTutorials, ...tutorials];
    allTutorials = flatMap(allTutorials);

    let finalTechniquesPath = "../../files/tutorials";
    fs.writeFileSync(`${finalTechniquesPath}/allTutorials.json`, JSON.stringify(allTutorials, null, 4));
  } catch (error) {
    console.log(error);
  }
};
getRawHtml().then(console.log).catch(console.log);
