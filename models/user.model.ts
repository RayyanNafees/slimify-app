import mongoose from "mongoose";
import md5 from "md5";

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
  weight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "weight",
  },
});

userSchema.pre("save", async function () {
  this.password = md5(this.password);
});

const User = mongoose.model("user", userSchema);

export default User;
