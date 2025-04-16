// routes/riderRoutes.js
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureRider } = require('../middleware/authmiddleWare');
const riderController = require('../controllers/riderController');

// Getting all orders assigned to this rider
router.get('/orders', ensureAuthenticated, ensureRider, riderController.getAssignedOrders);

// Updating an order's status (e.g., mark as Delivered or Undelivered) by a rider
router.put('/orders/:orderId', ensureAuthenticated, ensureRider, riderController.updateOrderStatus);

module.exports = router;
// This route handles functionalities specific to riders, such as viewing assigned orders and updating order status. It requires the user to be authenticated and have rider privileges.
// The routes are organized to ensure that only authenticated users with the appropriate roles can access certain functionalities. This structure helps maintain security and proper access control within the application.