const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const instructionsSchema = new Schema(
  {
    name: { type: String },
    type: { type: String, enum: ["INGREDIENT", "RECIPE"], uppercase: true },
    description: [{ type: String }],
    tips: [{ type: ObjectId, ref: "Tip" }],
    metadata: {},
  },
  { timestamps: true }
);

const instructionsModel = model("Instruction", instructionsSchema);
module.exports = {
  Instruction: instructionsModel,
};
