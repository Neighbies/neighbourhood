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

// --- GET login form --- //
router.get('/login', (req, res, next) => {
  res.render('auth/login', {
    errorMessage: ''
  });
});

// --- GET logout --- //
router.get('/logout', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/'); // If user not logged in
    return;
  }

  req.session.destroy((err) => {
    if (err) { // If error occurres while loggin out
      next(err);
      return;
    }

    res.redirect('/'); // Logged out
  });
});

// --- POST signup form --- //
router.post('/signup', (req, res, next) => {
  const usernameInput = req.body.username;
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (usernameInput === '' || passwordInput === '') { // If any of them is empty, show the form
    res.render('auth/signup', {
      errorMessage: 'Enter both email and password to sign up.'
    });
    return;
  }

  User.findOne({ email: emailInput }, '_id', (err, existingUser) => {
    if (err) { // If any error, display it
      next(err);
      return;
    }

    if (existingUser !== null) { // The user already exists
      res.render('auth/signup', {
        errorMessage: `The email ${emailInput} is already in use.`
      });
      return;
    }

    // If we're here, the user doesn't exist and no error occurred

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPass = bcrypt.hashSync(passwordInput, salt);

    const userSubmission = {
      username: usernameInput,
      email: emailInput,
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

      req.session.currentUser = theUser;
      res.redirect('/');
    });
  });
});

// --- POST login form --- //
router.post('/login', (req, res, next) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (emailInput === '' || passwordInput === '') { // If any of them is empty, show the form
    res.render('auth/login', {
      errorMessage: 'Enter both email and password to log in.'
    });
    return;
  }

  User.findOne({ email: emailInput }, (err, theUser) => {
    if (err || theUser === null) { // If any error or the user doesn't exist
      res.render('auth/login', {
        errorMessage: `There isn't an account with email ${emailInput}.`
      });
      return;
    }

    if (!bcrypt.compareSync(passwordInput, theUser.password)) { // If passwords doesn't match
      res.render('auth/login', {
        errorMessage: 'Invalid password.'
      });
      return;
    }

    req.session.currentUser = theUser;
    res.redirect('/');
  });
});

module.exports = router;
