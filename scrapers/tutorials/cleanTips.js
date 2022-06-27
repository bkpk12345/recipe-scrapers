const forEach = require("lodash.foreach");
const tips = require("./tips2.json");
let newTips = [];
const fs = require("fs");
const filter = require("lodash.filter");

const { map, startCase } = require("lodash");
const { v4 } = require("uuid");
let chapters = [
  "How to Cook Eggs",
  "How to Cook Vegetables",
  "How to Cook Pasta",
  "How to Cook Rice, Grains, and Beans",
  "How to Cook Meat",
  "How to Cook Poultry",
  "How to Cook Seafood",
  "How to Grill",
  "How to Make Stocks and Soups",
  "How to Make Salad",
  "How to Make Quick Breads",
  "How to Make Yeast Breads and Pizzas",
  "How to Make Cookies",
  "How to Make Cakes",
  "How to Make Fruit Desserts",
  "How to Make Pies and Tarts",
  "How to Make Custards, Puddings, and Frozen Desserts",
];
// forEach(tips, (tip) => {
chapters.forEach((chapter) => {
  let filteredChapters = filter(tips, { chapterName: chapter });
  let categories = new Set();
  forEach(filteredChapters, (chapter) => {
    categories.add(chapter.category);
  });
  categories = Array.from(categories);

  categories.forEach((category) => {
    let categoryWiseFilteredChapteres = filter(tips, { category });
    let properties = [];

    forEach(categoryWiseFilteredChapteres, (chapter) => {
      properties.push({
        title: chapter.title,
        desctiption: chapter.desctiption,
        id: chapter.id,
      });
    });

    newTips.push({
      tip: category,
      desctiption: "",
      properties,
      chapterName: chapter,
      id: v4(),
      book: startCase("the-Americas-Test-Kitchen"),
    });
  });
});

// let desc = JSON.stringify(tip.desctiption);
// delete tip["desctiption"];
// newTips.push({
//   ...tip, //
//   description: desc,
// });
// });

fs.writeFileSync("../../allTips/tips2.json", JSON.stringify(newTips, null, 4));
