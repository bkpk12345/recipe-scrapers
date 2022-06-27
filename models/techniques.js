const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const techniquesSchema = new Schema(
  {
    name: { type: String },
    type: { type: String, enum: ["INGREDIENT", "RECIPE"], uppercase: true },
    equipments: [{ type: String }],
    tips: [{ type: ObjectId, ref: "Tip" }],
    description: [{ type: String }],
    metadata: {},
  },
  { timestamps: true }
);

const TechniquesModel = model("Technique", techniquesSchema);
module.exports = {
  Technique: TechniquesModel,
};
