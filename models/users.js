const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  photoUrl: { type: String },
  isSeller: { type: Boolean, required: true, enum: [true, false] },
  tokens: [{ token: { type: String } }],
});

dataSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

dataSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET);

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = new mongoose.model("USER", dataSchema);

module.exports = User;
