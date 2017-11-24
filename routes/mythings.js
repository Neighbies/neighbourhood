const express = require('express');
const router = express.Router();

const Category = require('../models/category');
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
    res.render('mythings/mythings', data);
  });
});

// --- GET show My Things Edit Form --- //
router.get('/mythings/edit/:thingId', ensureAuthenticated, (req, res, next) => {
  const thingId = req.params.thingId;

  Thing.findById(thingId, (err, thing) => {
    if (err) {
      return next(err);
    }
    res.render('mythings/mythings_edit', {thing});
  });
});

// --- GET show My Things Add Form --- //
router.get('/mythings/add', ensureAuthenticated, (req, res, next) => {
  res.render('mythings/mythings_add');
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

// --- POST add new thing --- //
router.post('/mythings/add', ensureAuthenticated, (req, res, next) => {
  let categories = [];
  let promises = [];
  let categoriesUser = req.body.categories;

  if (categoriesUser !== undefined) {
    categoriesUser = req.body.categories.split(' ');
    categoriesUser.forEach(category => {
      promises.push(
        Category.find({title: category})
          .then(result => {
            console.log(result[0]._id);
            categories.push(result[0]._id);
          })
          .catch(err => console.log(err))
      );
    });
  }

  Promise.all(promises)
    .then(() => {
      console.log(categories);
      const thingInfo = {
        title: req.body.title,
        localitzation: req.body.localitzation,
        price: req.body.price,
        categories: categories,
        user: req.user._id,
        pic_path: `/pictures/things-pictures/${req.body.pic_path}`
        // pic_name: req.file.originalname
      };
      const newThing = Thing(thingInfo);
      newThing.save((err) => {
        return next(err);
      });
      res.redirect('/mythings');
    })
    .catch(err => console.log(err));
  // }
});

// --- POST delete My Thing --- //
router.post('/mythings/delete/:thingId', ensureAuthenticated, (req, res, next) => {
  const thingId = req.params.thingId;
  console.log(thingId);
  Thing.findByIdAndRemove(thingId, (err, thing) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/mythings');
  });
});

module.exports = router;
