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
    title: 'category1',
    pic_path: '',
    pic_name: ''
  },
  {
    title: 'category2',
    pic_path: '',
    pic_name: ''
  }
];

const things = [
  {
    title: 'thing1',
    localitzation: [],
    categories: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
    ],
    price: 8
  },
  {
    title: 'thing2',
    localitzation: [],
    categories: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
    ],
    price: 7
  }
];

const users = [
  {
    username: 'user1',
    email: '',
    telephone: '',
    password: bcrypt.hashSync('', salt),
    prof_pic_path: '',
    prof_pic_name: '',
    things: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Thing' }
    ]
  },
  {
    username: 'user2',
    email: '',
    telephone: '',
    password: bcrypt.hashSync('', salt),
    prof_pic_path: '',
    prof_pic_name: '',
    things: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Thing' },
      { type: mongoose.Schema.Types.ObjectId, ref: 'Thing' }
    ]
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
