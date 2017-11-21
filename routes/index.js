const express = require('express');
const router = express.Router();
const Category = require('../models/category');
// const User = require('../models/user');

// --- GET home page --- //
router.get('/', (req, res, next) => {
  Category.find({}, (err, category) => {
    if (err) {
      return next(err);
    }
    if (req.isAuthenticated()) {
      res.render('index', { title: 'Express', loggedIn: true, categories: category });
    } else {
      res.render('index', { title: 'Express', loggedIn: false, categories: category });
    }
  });
});

module.exports = router;
