import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a name for this User."],
    },
    email: {
      type: String,
      required: [true, "Please provide a Email for this User."],
      unique:[true,'Email Must Be Unique']
    },
    password: {
      type: String,
      required: [true, "Please provide a Password for this User."],
    },
    userType: {
      type: String,
      enum: ["NGO", "SUPER_ADMIN"],
      default: "NGO",
      required: [true, "Please provide a usertype for this User."],
    },
    ngo: {
      type: Schema.Types.ObjectId,
      ref: "Ngo",
      required: [true, "Please provide a Ngo for this User."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
