const express = require('express');
const router = express.Router();

// const User = require('../models/user.js');

router.get('/things/:catId', (req, res, next) => {
  const catId = req.params.catId;
  // res.render('auth/signup');
});

module.exports = router;
