const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const cuisineSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    type: { type: String, enum: ["INGREDIENT", "RECIPE"], uppercase: true },
    description: [{ type: String }],
    metadata: {},
  },
  { timestamps: true }
);

const cuisineModel = model("Cuisine", cuisineSchema);
module.exports = {
  Cuisine: cuisineModel,
};
