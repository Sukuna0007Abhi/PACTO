// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [String],
    variants: {
      colors: [String],
      sizes: [String]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
// This schema defines the structure of the product data in MongoDB.