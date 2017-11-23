const express = require('express');
const router = express.Router();

// const Category = require('../models/category');
const Thing = require('../models/thing');
const User = require('../models/user');

// --- GET things by category --- //
router.get('/things', (req, res, next) => {
  const catId = req.query.cat;
  const terms = req.query.terms;
  let userPic;
  let findQuery = {};

  if (catId !== undefined && terms !== undefined) {
    findQuery = {
      categories: catId,
      $text: {$search: terms}
    };
  } else if (catId !== undefined) {
    findQuery = {
      categories: catId
    };
  } else if (terms !== undefined) {
    findQuery = {
      $text: {$search: terms}
    };
  }

  Thing.find(findQuery, (err, thing) => {
    if (err) {
      return next(err);
    }
    if (req.user !== undefined) {
      userPic = {
        path: req.user.prof_pic_path,
        name: req.user.prof_pic_name
      };
    }
    res.render('things/things_list', { data: thing, userPic });
  });
});

// --- GET individual thing --- //
router.get('/things/:id', (req, res, next) => {
  const thingId = req.params.id;
  let userPic;

  Thing.findById(thingId, (err, thing) => {
    if (err) {
      return next(err);
    }
    User.findById(thing.user, (err, user) => {
      if (err) {
        return next(err);
      }
      if (req.user !== undefined) {
        userPic = {
          path: req.user.prof_pic_path,
          name: req.user.prof_pic_name
        };
      }
      res.render('things/things_one', { loggedIn: req.isAuthenticated(), thing, user, userPic });
    });
  });
});

module.exports = router;
