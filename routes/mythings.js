const express = require('express');
const router = express.Router();

// const Category = require('../models/category');
const Thing = require('../models/thing');
// const User = require('../models/user');

// --- GET all My Things --- //
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

// --- GET show My Things Edit Form --- //
router.get('/mythings/edit/:thingId', ensureAuthenticated, (req, res, next) => {
  const thingId = req.params.thingId;

  Thing.findById(thingId, (err, thing) => {
    if (err) {
      return next(err);
    }
    res.render('things/mythings_edit', {thing});
  });
});

// --- POST edit one of My Things --- //
router.post('/mythings/edit/:thingId', ensureAuthenticated, (req, res, next) => {
  const thingId = req.params.thingId;

  const thingUpdate = {
    title: req.body.title,
    localitzation: req.body.localitzation,
    price: req.body.price
  };

  Thing.findByIdAndUpdate(thingId, thingUpdate, (err, thing) => {
    if (err) {
      return next(err);
    }
    console.log(thing);
    res.redirect('/mythings');
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
