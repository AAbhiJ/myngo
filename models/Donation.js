import mongoose, { Schema } from "mongoose";

const DontationSchema = new mongoose.Schema(
  {
    donationMethod: {
      type: String,
      enum: ["skill", "amount"],
      default: "",
      required: [true, "Please provide a donation method type for this Dontation."],
    },
    name: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required:true,   
    },
    contact:{
      type: String,
      required:true,   
    },
    amount: {
      type: Number,
    },
    skillType: {
      type: String,
    },
    hrsPerDay:{
      type:Number,
    },
    daysPerWeek:{
      type:Number,
    },
    date_from: {
      type: Date,
    },
    date_to: {
      type: Date,
    },
    ngo: {
      type: Schema.Types.ObjectId,
      ref: "Ngo",
      required: [true, "Please provide a Ngo for this Dontation."],
    },

  },
  { timestamps: true }
);

export default mongoose.models.Dontation || mongoose.model("Dontation", DontationSchema);
