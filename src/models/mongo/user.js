import Mongoose from "mongoose";
import Boom from "@hapi/boom";
import bcrypt from "bcrypt";

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

// Updating password logic for bcrypt
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  if (!isMatch) {
    throw Boom.unauthorized("Password mismatch");
  }
  return this;
};

export const User = Mongoose.model("User", userSchema);
