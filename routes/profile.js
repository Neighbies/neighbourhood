const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// --- GET home page --- //
router.get('/profile', ensureAuthenticated, (req, res, next) => {
  res.render('profile/profile', {user: req.user});
});

// --- POST edit page --- //
router.post('/profile/edit', (req, res, next) => {
  const userId = req.user._id;
  let passInput = req.user.password;
  let prof_pic_pathInput = req.user.prof_pic_path;
  let prof_pic_nameInput = req.user.prof_pic_name;

  if (!confirmPassword(req.body.password)) {
    res.render('profile/profile', { user: req.user, message: "Password didn't match" });
    return;
  }
  if (req.body.password[0] != '') {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password[0], salt);
    passInput = hashPass;
  }
  if (req.file !== undefined) {
    prof_pic_pathInput = `/uploads/${req.file.filename}`;
    prof_pic_nameInput = req.file.originalname;
  }
  const userUpdate = {
    prof_pic_path: prof_pic_pathInput,
    prof_pic_name: prof_pic_nameInput,
    username: req.body.username,
    email: req.body.email,
    password: passInput,
    telephone: req.body.telephone,
    location: req.body.location
  };
  console.log(userUpdate);

  User.findByIdAndUpdate(userId, userUpdate, (err, user) => {
    if (err) {
      return next(err);
    }
    console.log(user);
    res.redirect('/');
  });
});

function confirmPassword (passwordArray) {
  return passwordArray[0] === passwordArray[1];
}

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
