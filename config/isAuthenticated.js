const exjwt = require("express-jwt");
require("dotenv").config();
// Init the express-jwt middleware

function isAuthenticated(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  next();
}

module.exports = isAuthenticated;
