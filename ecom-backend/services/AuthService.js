//The MongoDb connection code
// services/authService.js
require('dotenv').config(); // Load environment variables

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Serialize user: defines what data of the user object should be stored in the session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user: retrieves full user information using the stored id.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Configuring Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,       // My Google Client ID from .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // My Google Client Secret from .env
      callbackURL: '/api/users/auth/google/callback'  // Must match My Google Cloud Console settings
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'customer' // Default role, modify as needed
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;

// The AuthService code