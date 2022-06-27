const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const variationsSchema = new Schema(
  {
    name: { type: String, unique: true, trim: true, required: true },
    description: [{ type: String }],
    tips: [{ type: ObjectId, ref: "Tip" }],
    metadata: {},
  },
  { timestamps: true }
);

const VariationModel = model("RecipeVariation", variationsSchema);
module.exports = {
  RecipeVariation: VariationModel,
};
