import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  weight: [
    {
      type: mongoose.Types.ObjectId,
      ref: "weight",
    },
  ],
});

const User = mongoose.model("users", userSchema);

export default User;