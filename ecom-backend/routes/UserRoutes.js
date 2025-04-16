// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Initiate Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback endpoint for Google OAuth
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    // Respond with JSON (or redirect to your frontend URL)
    res.json({ message: 'Google authentication successful', user: req.user });
  }
);

// Logout route (optional)
router.get('/logout', (req, res) => {
  req.logout(); // Passport attaches this function
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
// This route handles Google authentication and logout.