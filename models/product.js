const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const dataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },

  uploadTime: {
    type: String,
    default: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
  },
  uploadDate: { type: String, default: new Date().toLocaleDateString() },
  uploadTimeInMl: { type: Number, default: Date.now() },

  images: [{ photoId: String, photoUrl: String }],
  price: { type: Number, required: true },
  max_quantity: { type: Number, required: true },

  // storing the user id to populate his information's
  user: { type: ObjectId, ref: "USER", required: true },
  shipping_options: [],

  product_category: {
    type: String,
    required: true,
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
      "DIY garden and pet",
    ],
  },

  reviews: [{ type: mongoose.Types.ObjectId, ref: "REVIEW" }],
  // averageRating: { type: Number, default: 0 },
});

const Product = new mongoose.model("PRODUCT", dataSchema);

module.exports = Product;
