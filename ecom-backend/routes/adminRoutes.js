// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/authmiddleWare');
const adminController = require('../controllers/adminController');

// Getting all orders (Admin view)
router.get('/orders', ensureAuthenticated, ensureAdmin, adminController.getAllOrders);

// Updating order (e.g., update status or assign a rider)
router.put('/orders/:orderId', ensureAuthenticated, ensureAdmin, adminController.updateOrder);

module.exports = router;
// This route handles admin functionalities, such as viewing and updating orders. It requires the user to be authenticated and have admin privileges.