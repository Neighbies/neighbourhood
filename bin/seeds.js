const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/neighborhood', {
  useMongoClient: true
});
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

const Category = require('../models/category');
const Thing = require('../models/thing');
const User = require('../models/user');

const categories = [
  {
    title: '',
    pic_path: '',
    pic_name: ''
  }
];

const things = [
  {
    title: '',
    localitzation: [],
    categories: [],
    price: 8
  }
];

const users = [
  {
    username: '',
    email: '',
    telephone: '',
    password: bcrypt.hashSync('', salt),
    prof_pic_path: '',
    prof_pic_name: '',
    things: []
  }
];

Category.create(categories, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((categories) => {
    console.log(categories.title);
  });
  mongoose.connection.close();
});

Thing.create(things, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((things) => {
    console.log(things.title);
  });
  mongoose.connection.close();
});

User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((users) => {
    console.log(users.username);
  });
  mongoose.connection.close();
});
