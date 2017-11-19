const express = require('express');
const router = express.Router();
const Category = require('../models/category');
// const User = require('../models/user');

// --- GET home page --- //
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    Category.find({}, (err, category) => {
      if (err) {
        return next(err);
      }
      res.render('index', { title: 'Express', loggedIn: true, categories: category });
    });
  } else {
    res.render('index', { title: 'Express', loggedIn: false });
  }
});

module.exports = router;
