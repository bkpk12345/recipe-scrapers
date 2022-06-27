const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const recipeSchema = new Schema(
  {
    source: { type: String },
    title: { type: String, required: true, trim: true, index: true },
    materials: [{ type: String }],
    id: { type: String },
    serves: { type: String },
    category: { type: ObjectId, ref: "Category" },
    tags: [{ type: String }],
    ingredients: [{ type: ObjectId, ref: "Ingredient" }],
    rawIngredients: [{ type: String, trim: true }],
    author: { type: String },
    cuisine: { type: ObjectId, ref: "Cuisine" },
    history: { type: String },
    prepTime: { type: String },
    cookTime: { type: String },
    equipments: [{ type: String }],
    variations: [{ type: ObjectId, ref: "RecipeVariation" }],
    instructions: [{ type: ObjectId, ref: "Instruction" }],
    tips: [{ type: ObjectId, ref: "Tip" }],
    archetype: { type: ObjectId, ref: "Archetype" },
    nutrition: [{ type: String, trim: true }],
    science: { type: ObjectId, ref: "Science" },
    rating: { type: String },
    metadata: {},
  },
  { timestamps: true }
);

const recipeModel = model("Recipe", recipeSchema);
module.exports = {
  Recipe: recipeModel,
};
