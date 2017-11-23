const express = require('express');
const router = express.Router();

// const Category = require('../models/category');
const Thing = require('../models/thing');
const User = require('../models/user');

// --- GET all user things --- //
router.get('/mythings', (req, res, next) => {
  console.log(req.user._id);
  //   Thing.find(findQuery, (err, thing) => {
  //     if (err) {
  //       return next(err);
  //     }

  res.render('things/mythings');
//   });
});

module.exports = router;
