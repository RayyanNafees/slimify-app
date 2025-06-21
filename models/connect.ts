
// import process from "node:process";
import mongoose from "mongoose";
// console.log({mongoURI: process.env.MONGO_URI})
console.log("Connecting to MongoDB...");
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => {
    console.log("MongoDB connection error:", e);
    throw e;
  });
