// controllers/adminController.js
const Order = require('../models/Order');

// GETTING /api/admin/orders - Retrieve all orders
exports.getAllOrders = async (req, res) => {
  try {
    // Optionally populate user details for each order
    const orders = await Order.find().populate('userId', 'name email');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// PUTTING /api/admin/orders/:orderId - Update an order's status or assign a rider
exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status, assignedRider } = req.body; // Expecting these in the request body

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status, assignedRider },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};
