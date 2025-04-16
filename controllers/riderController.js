// controllers/riderController.js
const Order = require('../models/Order');

// GETTING /api/rider/orders - Retrieve orders assigned to the logged-in rider
exports.getAssignedOrders = async (req, res) => {
  try {
    // Assuming req.user._id is the rider’s id
    const orders = await Order.find({ assignedRider: req.user._id });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assigned orders', error });
  }
};

// PUTTING /api/rider/orders/:orderId - Update an order's status by the rider
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // For example, "Delivered" or "Undelivered"

  try {
    // Ensuring that the order is assigned to this rider
    const order = await Order.findOne({ _id: orderId, assignedRider: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found or not assigned to you' });
    }
    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};
