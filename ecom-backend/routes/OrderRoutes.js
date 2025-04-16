// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { ensureAuthenticated } = require('../middleware/authmiddleWare'); // Middleware to check if user is authenticated

// Create an order (requires user to be authenticated)
router.post('/', ensureAuthenticated, orderController.createOrder);

module.exports = router;
// This route handles creating orders. It requires the user to be authenticated.
