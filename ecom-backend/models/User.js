// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    role: {
      type: String,
      enum: ['customer', 'admin', 'rider'],
      default: 'customer'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
// This schema defines the structure of the user data in MongoDB.