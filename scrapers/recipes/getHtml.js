const getRawHtml = async () => {
  try {
    const cheerio = require("cheerio");
    let bookPath = "./../files/ebook3/index.html";
    bookPath = path.join(__dirname, bookPath);
    const file = fs.readFileSync(bookPath);

    const $ = cheerio.load(file);
    let ranges = [
      // {
      //   start: 259,
      //   end: 260,
      //   fileName: "How-to-Cook-Eggs",
      // },
      {
        start: 326,
        end: 327,
        fileName: "How-to-Cook-Vegetables",
      },
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
      // {
      //   start: 702,
      //   end: 703,
      //   fileName: "How-to-make-Stocks-and-Soups",
      // },
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
      {
        start: 971,
        end: 972,
        fileName: "How-to-make-Pies-and-Tarts",
      },
    ];

    let promises = ranges.map(async (r) => {
      let selector1 = `body > div:nth-child(${r.start}) > div`;
      let selector2 = `body > div:nth-child(${r.end}) > div`;
      let div1 = $(selector1).html();
      let div2 = $(selector2).html();
      let rawFile = "<div>" + div1 + div2 + "</div>";
      const fileName = r.fileName;
      fs.writeFileSync(`../files/rawHtml/${fileName}.html`, rawFile);
      let newFile = fs.readFileSync(`../files/rawHtml/${fileName}.html`);
      return await scrape(newFile, fileName);
    });
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
};
module.exports = getRawHtml;
