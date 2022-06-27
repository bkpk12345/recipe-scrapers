const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const tipsSchema = new Schema(
  {
    source: {},
    name: { type: String },
    type: {
      type: String,
      required: true,
      enum: ["INGREDIENT", "RECIPE", "INSTRUCTION", "TECHNIQUE", "RECIPEVARIATION"],
      uppercase: true,
    },
    description: [{ type: String }],
    metadata: {},
  },
  { timestamps: true }
);

const tipModel = model("Tip", tipsSchema);
module.exports = {
  Tip: tipModel,
};
