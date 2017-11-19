const express = require('express');
const router = express.Router();

const Category = require('../models/category');
const Thing = require('../models/thing');
const User = require('../models/user');

// --- GET things by category --- //
router.get('/things/:catId', (req, res, next) => {
  const catId = req.params.catId;
  Thing.find({ categories: catId }, (err, thing) => {
    if (err) {
      return next(err);
    }
    res.render('things/things_list', { data: thing });
  });
});

// --- GET individual thing --- //
router.get('/things/:id/show', (req, res, next) => {
  const thingId = req.params.id;
  Thing.findById(thingId, (err, thing) => {
    if (err) {
      return next(err);
    }
    res.render('things/things_one', { thing });
  });
});

module.exports = router;
