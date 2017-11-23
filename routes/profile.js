const express = require('express');
const router = express.Router();
const User = require('../models/user');

// --- GET home page --- //
router.get('/profile', ensureAuthenticated, (req, res, next) => {
  res.render('profile/profile', {user: req.user});
});

// --- POST edit page --- //
router.post('/profile/edit', (req, res, next) => {
  console.log(req);
  res.redirect('/');
});

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
