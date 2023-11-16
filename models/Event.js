import mongoose, { Schema } from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    venue: {
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
      required: [true, "Please provide a Ngo for this Event."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
