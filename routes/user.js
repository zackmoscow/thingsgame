const Router = require('express').Router();
const db = require('../models');

Router.route('/register').post((req,res)=>{
  db.User.create(req.body)
      .then(data => {
        console.log(req.body, data)
        res.json(data)})
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
});

Router.route('/login/:email/:password').get((req,res)=>{
  db.User.find()
      .and([
          {email: req.params.email},
          {password: req.params.password} 
      ])
      .then(data => {
        console.log(data)
        if(!data.length){
          res.status(400);
        } else {
          res.json(data)
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
});


module.exports = Router;