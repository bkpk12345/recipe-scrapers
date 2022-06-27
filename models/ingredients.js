const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const ingredientSchema = new Schema(
  {
    name: { type: String, unique: true, trim: true, required: true },
    category: { type: ObjectId, ref: "Category" },
    substitution: { type: String },
    description: [{ type: String }],
    tips: [{ type: ObjectId, ref: "Tip" }],
    cuisine: { type: ObjectId, ref: "Cuisine" },
    metadata: {},
  },
  { timestamps: true }
);

const ingredientModel = model("Ingredient", ingredientSchema);
module.exports = {
  Ingredient: ingredientModel,
};
