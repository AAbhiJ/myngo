import mongoose, { Schema } from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
    contact: {
        type: Number,
        required: true,
        },
    email: {
        type: String,
        required: true,
    },
    ngo: {
      type: Schema.Types.ObjectId,
      ref: "Ngo",
      required: [true, "Please provide a Ngo for this Member."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Member || mongoose.model("Member", MemberSchema);
