const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const User = require('../models/user.js');

// --- GET signup form --- //
router.get('/signup', (req, res, next) => {
  res.render('auth/signup', {
    errorMessage: ''
  });
});

// --- POST signup form --- //
router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (email === '' || password === '') { // If any of them is empty, show the form
    res.render('auth/signup', {
      errorMessage: 'Enter both email and password to sign up.'
    });
    return;
  }

  User.findOne({ email: email }, '_id', (err, existingUser) => {
    if (err) { // If any error, display it
      next(err);
      return;
    }

    if (existingUser !== null) { // The user already exists
      res.render('auth/signup', {
        errorMessage: `The email ${email} is already in use.`
      });
      return;
    }

    // If we're here, the user doesn't exist and no error occurred

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPass = bcrypt.hashSync(password, salt);

    const userSubmission = {
      username: username,
      email: email,
      password: hashedPass
    };

    const theUser = new User(userSubmission);

    theUser.save((err) => {
      if (err) { // Random error while trying to save the user to the DB
        res.render('auth/signup', {
          errorMessage: 'Something went wrong. Try again later.'
        });
        return;
      }

      res.redirect('/');
    });
  });
});

module.exports = router;
