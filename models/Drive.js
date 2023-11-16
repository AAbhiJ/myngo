import mongoose, { Schema } from "mongoose";

const DriveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    team_leader: {
      type: String,
      required: true,
    },
    extra_information: {
      type: String,
      required: true,
    },
    date_from: {
      type: Date,
      required: true,
    },
    date_to: {
      type: Date,
      required: true,
    },
    ngo: {
      type: Schema.Types.ObjectId,
      ref: "Ngo",
      required: [true, "Please provide a Ngo for this Drive."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Drive || mongoose.model("Drive", DriveSchema);
