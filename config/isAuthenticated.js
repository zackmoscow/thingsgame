const exjwt = require("express-jwt");
require("dotenv").config();
// Init the express-jwt middleware

console.log(process.env.SERVER_SECRET);

const isAuthenticated = exjwt({
  secret: process.env.SERVER_SECRET
});

module.exports = isAuthenticated;
