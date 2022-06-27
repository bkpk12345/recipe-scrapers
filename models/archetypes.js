const { Schema, model, Types } = require("mongoose");

const { ObjectId } = Types;

const archetypesSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    description: [{ type: String }],
    metadata: {},
  },
  { timestamps: true }
);

const archetypeModel = model("Archetype", archetypesSchema);
module.exports = {
  Archetype: archetypeModel,
};
