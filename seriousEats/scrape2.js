const fs = require("fs");
const forEach = require("lodash.foreach");
const allRecipes = require("./tests/newRecipes4.json");
let scrapesLinks = new Set();
let nonScrapedLinks = new Set();
forEach(allRecipes, (recipe) => {
  if (recipe?.name == "") {
    nonScrapedLinks.add(recipe.recipeLink);
  } else {
    if (recipe && recipe?.recipeLink) scrapesLinks.add(recipe.recipeLink);
  }
});
nonScrapedLinks = Array.from(nonScrapedLinks);
scrapesLinks = Array.from(scrapesLinks);
fs.writeFileSync("./nonScrapedLinks.json", JSON.stringify(nonScrapedLinks, null, 4));
fs.writeFileSync("./scrapesLinks.json", JSON.stringify(scrapesLinks, null, 4));
