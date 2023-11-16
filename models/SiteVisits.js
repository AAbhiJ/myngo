import mongoose, { Schema } from "mongoose";

const SiteVisitSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteVisit || mongoose.model("SiteVisit", SiteVisitSchema);
