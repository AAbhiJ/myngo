import mongoose, { Schema } from "mongoose";

const RequirementSchema = new mongoose.Schema(
  {
    ngo: {
      type: Schema.Types.ObjectId,
      ref: "Ngo",
      required: [true, "Please provide a Ngo for this Requirement."],
    },
    name: {
      type: String,
      required: [true, "Please provide a name for this Requirement."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Requirement ||
  mongoose.model("Requirement", RequirementSchema);
