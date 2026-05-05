const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  emoji: String,
  stock: Number,
});

module.exports = mongoose.model("Product", productSchema);