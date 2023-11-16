import mongoose, { Schema } from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    photos: {
        type: String,
        required: true,
      },
    ngo: {
      type: Schema.Types.ObjectId,
      ref: "Ngo",
      required: [true, "Please provide a Ngo for this Gallery."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
