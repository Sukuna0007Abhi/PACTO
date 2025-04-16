// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    // The user who placed the order
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // An array to store details for each product in the order
    products: [
      {
        // Reference to the Product document for detailed product information
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        // Stores the selected color option for the product
        selectedColor: { type: String, required: true },
        // Stores the selected size option for the product
        selectedSize: { type: String, required: true },
        // Quantity is optional (default is set to 1)
        quantity: { type: Number, default: 1 }
      }
    ],
    
    // Order status property with allowed values
    status: {
      type: String,
      enum: ['Paid', 'Shipped', 'Delivered', 'Undelivered'],
      default: 'Paid'
    },
    
    // Optional field for assigning a rider to the order (for admin/rider-specific functionality)
    assignedRider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    // Order creation date
    orderDate: { type: Date, default: Date.now }
  },
  { timestamps: true } // This adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model('Order', orderSchema);

// This schema defines the structure of the order data in MongoDB.