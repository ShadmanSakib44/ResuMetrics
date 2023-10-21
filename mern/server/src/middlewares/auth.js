const passport = require("passport");

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is authenticated, allow access to the protected route
    return next();
  } else {
    // User is not authenticated, send an unauthorized response
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports = authMiddleware;
