const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    subtotal: Number,
    gst: Number,
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);