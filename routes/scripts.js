const express = require("express");
const router = express.Router();

const ingredienCtrl = require("../controllers/scripts/insertIngredients");
const recipeenCtrl = require("../controllers/scripts/insertRecipes");

router.get("/addGlobalIngredeints", ingredienCtrl.insertGlobalIngredients);
router.get("/insertRecipes", recipeenCtrl.insertRecipesFromCsvs);

module.exports = router;
