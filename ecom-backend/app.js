// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/Mngdb');
const passport = require('./services/AuthService');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Configure session middleware (required for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state from the session
app.use(passport.initialize());
app.use(passport.session());

// Mount your routes
// Product and Order routes (assuming these exist)
const productRoutes = require('./routes/ProductRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const userRoutes = require('./routes/UserRoutes');
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Mount Admin and Rider routes
const adminRoutes = require('./routes/adminRoutes');
const riderRoutes = require('./routes/riderRoutes');
app.use('/api/admin', adminRoutes);
app.use('/api/rider', riderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Exporting the app for testing purposes