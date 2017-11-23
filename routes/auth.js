const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const User = require('../models/user');

/* LOCAL srategy */

// --- GET signup form --- //
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

// --- GET login form --- //
router.get('/login', (req, res, next) => {
  res.render('auth/login', { 'message': req.flash('error') });
});

// --- GET logout --- //
router.get('/logout', ensureLogin.ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect('/');
});

// --- POST signup form --- //
router.post('/signup', (req, res, next) => {
  const usernameInput = req.body.username;
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (usernameInput === '' || passwordInput === '') {
    res.render('auth/signup', { message: 'Indicate username and password' });
    return;
  }

  User.findOne({ username: usernameInput }, (user) => {
    if (user !== null) {
      res.render('auth/signup', { message: 'The username already exists' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(passwordInput, salt);

    const newUser = new User({
      username: usernameInput,
      email: emailInput,
      password: hashPass,
      prof_pic_path: '/pictures',
      prof_pic_name: 'avatar.png'
    });

    newUser.save((err) => {
      if (err) {
        res.render('auth/signup', { message: 'Something went wrong' });
      } else {
        req.login(newUser, (err) => {
          if (err) {
            res.render('auth/signup', { message: 'Something went wrong' });
          }
          return res.redirect('/');
        });
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

/* GOOGLE Strategy */
router.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: '/'
}));

module.exports = router;
