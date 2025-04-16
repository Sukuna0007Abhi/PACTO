// middleware/authMiddleware.js

// Ensuring user is authenticated
exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  };
  
  // Ensuring the user is an admin
  exports.ensureAdmin = function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    res.status(403).json({ message: 'Forbidden: Admin access required' });
  };
  
  // Ensuring the user is a rider
  exports.ensureRider = function (req, res, next) {
    if (req.user && req.user.role === 'rider') {
      return next();
    }
    res.status(403).json({ message: 'Forbidden: Rider access required' });
  };
  
// This middleware checks if the user is authenticated and has the required role.  