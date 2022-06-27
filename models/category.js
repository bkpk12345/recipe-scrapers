const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const categorySchema = new Schema(
  {
    name: { type: String, unique: true, trim: true, required: true },
    type: { type: String, enum: ["INGREDIENT", "RECIPE"], uppercase: true },
    description: [{ type: String }],
    metadata: {},
  },
  { timestamps: true }
);

const categoryModel = model("Category", categorySchema);
module.exports = {
  Category: categoryModel,
};
