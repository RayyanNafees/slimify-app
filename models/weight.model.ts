import mongoose from "mongoose";

const weightSchema = new mongoose.Schema(
  {
    // user inputs
    weight: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Weight = mongoose.model("weight", weightSchema);

export default Weight;
