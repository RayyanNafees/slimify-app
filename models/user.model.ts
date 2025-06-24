import mongoose from "mongoose";
import bcrypt from "bcrypt"

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

userSchema.pre('save', function() {
  this.password = bcrypt.hashSync(this.password, 12)
})

const User = mongoose.model("users", userSchema);

export default User;