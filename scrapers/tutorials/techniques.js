const fs = require("fs");
const path = require("path");
const { range, map, startCase, flatMap } = require("lodash");

const scrape = async (file, fileName) => {
  let allTechniques = [];
  let cheerio = require("cheerio");

  let $ = cheerio.load(file);
  let h2 = $("h2.calibre4");

  h2.each((index, ele) => {
    let desc = [];
    $(ele) //
      .nextUntil("p.topicsubsection")
      .next(".topicbodynoindent")
      .each((i, e) => {
        desc.push($(e).text().trim());
        desc.push($(e).next(".topicbody").text().trim());
      });
    let category = $(ele).text();
    let equipments = [];
    let steps = [];
    let description = [];
    $(ele)
      .nextUntil("p.topicbodynoindent")
      .next("ul")
      .each((i, e) => {
        equipments.push($(e).text().trim());
      });

    $(ele)
      .nextUntil("h2")
      .next(".topicsubsection")
      .each((i, e) => {
        let why = $(e).next().next("").next().text().split("WHY?");
        why = `${why[1]}`;
        why = why.toString().trim();
        steps.push({
          title: $(e).text().trim(),
          description: $(e).next().next(".topicbodynoindent").text().trim(),
          why: why,
        });
      });

    allTechniques.push({
      category,
      equipments,
      steps,
      chapter: startCase(fileName),
      book: startCase("The americas test kitchen"),
      description: desc,
    });
  });

  return allTechniques;
};

const getRawHtml = async () => {
  try {
    let allTechniques = [];
    let cheerio = require("cheerio");

    let bookPath = "./../../files/ebook3/index.html";
    bookPath = path.join(__dirname, bookPath);
    const file = fs.readFileSync(bookPath);

    let $ = cheerio.load(file);
    let ranges = [
      {
        start: 242,
        end: 243,
        fileName: "How-to-Cook-Eggs",
      },
      {
        start: 310,
        end: 311,
        fileName: "How-to-Cook-Vegetables",
      },
      {
        start: 363,
        end: 364,
        fileName: "How-to-Cook-Pasta",
      },
      {
        start: 414,
        end: 415,
        fileName: "How-to-Cook-Rice-Grains-and-Beans",
      },
      {
        start: 504,
        end: 505,
        fileName: "How-to-Cook-Meat",
      },
      {
        start: 564,
        end: 565,
        fileName: "How-to-Cook-Poultry",
      },
      {
        start: 607,
        end: 608,
        fileName: "How-to-Cook-Seafood",
      },
      {
        start: 637,
        end: 638,
        fileName: "How-to-grill",
      },
      {
        start: 681,
        end: 682,
        fileName: "How-to-make-Stocks-and-Soups",
      },
      {
        start: 738,
        end: 739,
        fileName: "How-to-make-Salad",
      },
      {
        start: 763,
        end: 764,

        fileName: "How-to-make-Quick-Breads",
      },
      {
        start: 788,
        end: 789,
        fileName: "How-to-make-Yeast-Breads-and-Pizzas",
      },
      {
        start: 828,
        end: 829,
        fileName: "How-to-make-Cookies",
      },
      {
        start: 875,
        end: 876,
        fileName: "How-to-make-Cakes",
      },
      {
        start: 922,
        end: 923,
        fileName: "How-to-make-Fruit-Desserts",
      },
      {
        start: 955,
        end: 956,
        fileName: "How-to-make-Pies-and-Tarts",
      },
      // //
      {
        start: 991,
        end: 992,
        fileName: "How-to-make-Custards-Puddings-and-Frozen-Desserts",
      },
    ];

    let promises = ranges.map(async (r, index) => {
      console.log({ r, index });

      let selector1 = `body > div:nth-child(${r.start})`;
      let selector2 = `body > div:nth-child(${r.end})`;

      console.log({ selector1, selector2 });
      let div1 = $(selector1).html();
      let div2 = $(selector2).html();
      let rawFile = "<div>" + div1 + div2 + "</div>";
      const fileName = r.fileName;
      return await scrape(rawFile, fileName, index);
    });
    let techniques = await Promise.all(promises);

    allTechniques = [...allTechniques, ...techniques];
    allTechniques = flatMap(allTechniques);

    let finalTechniquesPath = "../../files/techniques";
    fs.writeFileSync(`${finalTechniquesPath}/allTechniques.json`, JSON.stringify(allTechniques, null, 4));
  } catch (error) {
    console.log(error);
  }
};
getRawHtml().then(console.log).catch(console.log);
