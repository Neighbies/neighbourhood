const express = require('express');
const router = express.Router();

// const Category = require('../models/category');
const Thing = require('../models/thing');
const User = require('../models/user');

// --- GET all user things --- //
router.get('/mythings', ensureAuthenticated, (req, res, next) => {
  Thing.find({user: req.user._id}, (err, result) => {
    if (err) {
      return next(err);
    }
    const data = {
      things: result
    };
    res.render('things/mythings', data);
  });
});

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
