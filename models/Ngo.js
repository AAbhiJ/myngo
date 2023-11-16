import mongoose, { Schema } from "mongoose";

const NgoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    registration_number: {
      type: String,
      required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ngo || mongoose.model("Ngo", NgoSchema);
