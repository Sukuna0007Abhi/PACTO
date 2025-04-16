// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    // Using req.user from authentication for userId
    const orderData = req.body;
    orderData.userId = req.user._id; // Setting logged-in user as the order's owner

    // Creating the order in the DB
    const order = await Order.create(orderData);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not create order' });
  }
};
// Additional functions for getting, updating, and deleting orders can be added here
