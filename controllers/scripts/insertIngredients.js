const { map, forEach, startCase } = require("lodash");
let ingredients = require("./ingredients.json");

const { Ingredient } = require("../../models/ingredients");

exports.insertGlobalIngredients = async (req, res) => {
  try {
    let newingredients = new Set();
    forEach(ingredients, (ingredient) => {
      let newIng = startCase(ingredient.ingredients);
      newingredients.add(newIng);
    });

    newingredients = Array.from(newingredients);

    newingredients = map(newingredients, async (ingredient) => {
      return await Ingredient.findOneAndUpdate(
        {
          name: ingredient,
        },
        {
          name: ingredient,
        },
        { upsert: true, new: true }
      ).lean();
    });

    newingredients = await Promise.all(newingredients);

    return res.send({
      newingredients,
    });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};
