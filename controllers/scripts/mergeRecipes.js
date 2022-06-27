const { map, forEach, startCase } = require("lodash");
let ingredients = require("./ingredients.json");
const path = require("path");
const fs = require("fs");

let bookPath = path.join(`${__dirname}/./../../allRecipes`);

const { Ingredient } = require("../../models/ingredients");

const insertRecipesFromCsvs = async () => {
  try {
    let booksFolder = fs.readdirSync(bookPath);
    let recipes = [];
    booksFolder.map(async (book) => {
      let finalBookPath = `${bookPath}/${book}/`;
      let chapterPath = fs.readdirSync(finalBookPath);
      // console.log({ chapterPath });

      chapterPath.map((chapter) => {
        let finalChapterPath = path.join(`${finalBookPath}/${chapter}`);
        let file = fs.readFileSync(finalChapterPath);
        file = JSON.parse(file);
        file.forEach((f) => {
          f["source"] = `${startCase(`${book}`)}`;
        });
        recipes = [...recipes, ...file];
      });
    });

    fs.writeFileSync("./allFinalRecipes.json", JSON.stringify(recipes, null, 4));
  } catch (error) {
    console.log(error.message);

    // res.send({
    //   error: error.message,
    // });
  }
};

insertRecipesFromCsvs().then(console.log).catch(console.log);
