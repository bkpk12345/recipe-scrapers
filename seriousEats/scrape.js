const fs = require("fs");
const { range, filter, forEach, map } = require("lodash");
// const recipeScraper = require("recippad-scraper");
const recipeScraper = require("recipe-scraper");
let links = require("./links.json");
links = map(links, "link");
let newLinks = new Set();

forEach(links, (link) => {
  newLinks.add(link.trim());
});
newLinks = Array.from(newLinks);

console.log({
  links: links.length,
  newLinks: newLinks.length,
});

let totalLength = links.length;

let batchSize = 50;
// for (let index = 0; index < links.length; index = index + batchSize) {
//   console.log({ from: index + 1, to: index + batchSize });
// }
let i = 0;
let allRecipes = [];
let interval = setInterval(async () => {
  if (i >= totalLength) {
    console.log("last now stpping");
    fs.writeFileSync("./tests/newRecipes5.json", JSON.stringify(allRecipes, null, 4));
    clearInterval(interval);
  } else {
    let linkRanges = range(i, i + batchSize);
    i = i + batchSize;
    let promisedRecipes = linkRanges.map(async (r) => {
      try {
        let newLink = links[r];
        console.log({ index: r, i, newLink });

        let recipe = await recipeScraper(newLink);
        recipe = {
          ...recipe,
          recipeLink: newLink,
        };
        return recipe;
      } catch (error) {}
    });
    promisedRecipes = await Promise.all(promisedRecipes);
    allRecipes = [...promisedRecipes, ...allRecipes];
  }
}, 2000);
