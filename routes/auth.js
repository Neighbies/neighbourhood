const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const User = require('../models/user.js');

// --- GET signup form --- //
router.get('/signup', (req, res, next) => {
  res.render('auth/signup', {
    'message': req.flash('error')
  });
});

// --- GET login form --- //
router.get('/login', (req, res, next) => {
  res.render('auth/login', {
    'message': req.flash('error')
  });
});

// --- GET logout --- //
router.get('/logout', ensureLogin.ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect('/login');
});
// router.get('/logout', (req, res, next) => {
//   if (!req.session.currentUser) {
//     res.redirect('/'); // If user not logged in
//     return;
//   }

//   req.session.destroy((err) => {
//     if (err) { // If error occurres while loggin out
//       next(err);
//       return;
//     }

//     res.redirect('/'); // Logged out
//   });
// });

// --- POST signup form --- //
router.post('/signup', (req, res, next) => {
  const usernameInput = req.body.username;
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (usernameInput === '' || passwordInput === '') {
    res.render('auth/signup', { message: 'Indicate username and password' });
    return;
  }

  User.findOne({ usernameInput }, 'username', (user) => {
    if (user !== null) {
      res.render('auth/signup', { message: 'The username already exists' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(passwordInput, salt);

    const newUser = new User({
      username: usernameInput,
      email: emailInput,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render('auth/signup', { message: 'Something went wrong' });
      } else {
        res.render('/');
      }
    });
  });
});

// --- POST login form --- //
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}));

// --- POST login form --- //
// router.post('/login', (req, res, next) => {
//   const emailInput = req.body.email;
//   const passwordInput = req.body.password;

//   if (emailInput === '' || passwordInput === '') { // If any of them is empty, show the form
//     res.render('auth/login', {
//       errorMessage: 'Enter both email and password to log in.'
//     });
//     return;
//   }

//   User.findOne({ email: emailInput }, (err, theUser) => {
//     if (err || theUser === null) { // If any error or the user doesn't exist
//       res.render('auth/login', {
//         errorMessage: `There isn't an account with email ${emailInput}.`
//       });
//       return;
//     }

//     if (!bcrypt.compareSync(passwordInput, theUser.password)) { // If passwords doesn't match
//       res.render('auth/login', {
//         errorMessage: 'Invalid password.'
//       });
//       return;
//     }

//     req.session.currentUser = theUser;
//     res.redirect('/');
//   });
// });

module.exports = router;
