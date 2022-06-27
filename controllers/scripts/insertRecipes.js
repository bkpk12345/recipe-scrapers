const { map, forEach, startCase } = require("lodash");
let allRecipes = require("./allFinalRecipes.json");
const path = require("path");
const fs = require("fs");

const { Ingredient } = require("../../models/ingredients");
const { Recipe } = require("../../models/recipe");
const { Instruction } = require("../../models/instructions");
const { Tip } = require("../../models/tips");
const { RecipeVariation } = require("../../models/variations");

exports.insertRecipesFromCsvs = async (req, res) => {
  try {
    let uniqRecipeTitle = new Set();
    let finalRecipes = [];
    let promisedRecipes = allRecipes.map(async (recipe, i) => {
      // if (recipe?.ingredients) {
      let rawIngredients = JSON.parse(recipe.ingredients);
      // let rawInstructions = JSON.parse(recipe.instructions);
      // let rawVariations = recipe?.variations ? JSON.parse(recipe?.variations) : [];
      // console.log(recipe.ingredients);
      // let ingredients = getIngredients(rawIngredients);
      // let instructionids = getInstructions(rawInstructions);
      // let variationIds = getVariations(rawVariations);
      // //
      // let loops = [await ingredients, await instructionids, await variationIds];
      // let [newIngredients, newInstructionids, newvariationIds] = await Promise.all(loops);

      let serves = recipe?.serves ?? "";
      let recipeObject = {
        source: recipe.source,
        title: recipe.title,
        serves: serves,
        rawIngredients: rawIngredients,
      };
      finalRecipes.push(recipe);
      uniqRecipeTitle.add(recipe.title);
      if (recipe?.title) {
        let savedRecipe = await new Recipe(recipeObject).save();
        console.log({ i });
        return savedRecipe;
      } else return null;
      // }
    });
    uniqRecipeTitle = Array.from(uniqRecipeTitle);
    console.log("before promise resolve");
    promisedRecipes = await Promise.all(promisedRecipes);
    console.log("after promise resolve");

    res.send({
      message: "ok",
      promisedRecipes: promisedRecipes.length,
      uniqRecipeTitle,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      error: error.message,
    });
  }
};

///////////////
// common functions

const getIngredients = async (rawIngredients = []) => {
  //
  try {
    let newIngredients = [];
    rawIngredients.forEach((ingredient) => {
      ingredient = ingredient.trim().replace(/\n/g, " ").replace(/\t/, " ");
      newIngredients.push(ingredient);
    });

    // rawIngredients = rawIngredients.map(async (ingredient) => {
    //   return await Ingredient.findOneAndUpdate({
    //     name: ingredient,
    //   },{});
    // });

    // rawIngredients = await Promise.all(rawIngredients);
    // let ids = map(rawIngredients, "_id");
    console.log({ newIngredients });
    return newIngredients;
  } catch (error) {
    throw error;
  }
};

const getInstructions = async (rawInstructions = []) => {
  try {
    let newInstruction = [];
    rawInstructions.forEach((instruction) => {
      instruction = instruction.trim().replace(/\n/g, " ").replace(/\t/, " ");
      newInstruction.push(instruction);
    });

    rawInstructions = rawInstructions.map(async (instruction) => {
      return await Instruction.findOneAndUpdate(
        {
          name: instruction,
        },
        { name: instruction },
        { upsert: true, new: true }
      );
    });

    rawInstructions = await Promise.all(rawInstructions);

    let ids = map(rawInstructions, "_id");

    return ids;
  } catch (error) {
    throw error;
  }
};

const getVariations = async (variations = []) => {
  try {
    let newvariations = [];
    variations.forEach((variation) => {
      variation = variation.trim().replace(/\n/g, " ").replace(/\t/, " ");
      newvariations.push(variation);
    });

    variations = variations.map(async (variation) => {
      return await RecipeVariation.findOneAndUpdate(
        {
          name: variation,
        },
        { name: variation },
        { upsert: true, new: true }
      );
    });

    variations = await Promise.all(variations);

    let ids = map(variations, "_id");

    return ids;
  } catch (error) {
    throw error;
  }
};
