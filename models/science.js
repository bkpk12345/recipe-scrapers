const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const scienceSchema = new Schema(
  {
    name: { type: String },
    type: { type: String, enum: ["INGREDIENT", "RECIPE"], uppercase: true },
    description: [{ type: String }],
    metadata: {},
  },
  { timestamps: true }
);

const scienceModel = model("Science", scienceSchema);
module.exports = {
  Science: scienceModel,
};
