const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// the user schema
const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  about: { type: String, default: "" },

  photoUrl: { type: String, default: "" },
  photoId: { type: String, default: "" },

  memberSince: { type: String, default: new Date().toLocaleDateString() },
  totalSales: { type: Number, default: 0 },

  isSeller: { type: Boolean, required: true, enum: [true, false] },
  isVerified: { type: Boolean, enum: [true, false], default: false },

  productCategory: {
    type: String,
    enum: [
      "Tech",
      "Toys",
      "Films and Cd's",
      "Car accessories",
      "Grocery",
      "Nonfood & Pharmacy",
      "Style & Fashion",
      "Sports Accessories",
      "Electrical technologies",
      "Cosmetics and Beauty",
      "Home and furniture",
      "Cloths and fabrics",
      "Books and Educational accessories",
      "Household appliances",
      "Toys and baby products",
      "Not specified yet",
      "DIY garden and pet",
    ],
    default: "Not specified yet",
  },

  showEmail: { type: Boolean, enum: [true, false], default: false },
  showPhone: { type: Boolean, enum: [true, false], default: false },

  socialLinks: [{ title: String, url: String }],
  // for storing the auth tokens
  tokens: [{ token: { type: String } }],
});

// hashing the password before saving
dataSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

// generating jwt token and returning it
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

// the user collection
const User = new mongoose.model("USER", dataSchema);

module.exports = User;
