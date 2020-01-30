const db = require("../models");

// Defining methods for the productsController
module.exports = {
  signUp: function(req, res) {
    db.User.create(req.body)
      .then(data => res.json(data))
      .catch(err => {
        res.status(400).json(err);
      });
  }
};
