const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_n3cl356c:l05e8dshg43vvhp3hqtbppdsi9@ds113936.mlab.com:13936/heroku_n3cl356c', {
  useMongoClient: true
});
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

const Category = require('../models/category');
const Thing = require('../models/thing');
const User = require('../models/user');

// const categories = [
//   {
//     title: 'category1',
//     pic_path: '',
//     pic_name: ''
//   }
// ];

// const things = [
//   {
//     title: 'thing1',
//     localitzation: [],
//     categories: [categories._id],
//     price: 8
//   }
// ];

const users = [
  {
    username: 'user1',
    email: '',
    telephone: '',
    password: bcrypt.hashSync('', salt),
    prof_pic_path: '',
    prof_pic_name: ''
    // things: [things._id]
  },
  {
    username: 'user2',
    email: '',
    telephone: '',
    password: bcrypt.hashSync('', salt),
    prof_pic_path: '',
    prof_pic_name: ''
    // things: [things._id]
  },
  {
    username: 'user3',
    email: '',
    telephone: '',
    password: bcrypt.hashSync('', salt),
    prof_pic_path: '',
    prof_pic_name: ''
    // things: [things._id]
  },
  {
    username: 'user4',
    email: '',
    telephone: '',
    password: bcrypt.hashSync('', salt),
    prof_pic_path: '',
    prof_pic_name: ''
    // things: [things._id]
  },
  {
    username: 'user5',
    email: '',
    telephone: '',
    password: bcrypt.hashSync('', salt),
    prof_pic_path: '',
    prof_pic_name: ''
    // things: [things._id]
  }
];

const categories = [
  {
    title: 'Music'
  },
  {
    title: 'Home'
  },
  {
    title: 'Animals'
  },
  {
    title: 'Deliveries'
  },
  {
    title: 'Transportation'
  },
  {
    title: 'Teaching'
  }
];

// const category = new Category({
//   _id: new mongoose.Types.ObjectId(),
//   title: 'category2',
//   pic_path: '',
//   pic_name: ''
// });

// category.save((err) => {
//   if (err) {
//     return err;
//   }

//   const thing = new Thing({
//     title: 'thing2',
//     localitzation: [],
//     categories: [category._id],
//     price: 8
//   });

//   thing.save((err) => {
//     if (err) {
//       return err;
//     }

//     const user = new User({
//       username: 'user2',
//       email: '',
//       telephone: '',
//       password: bcrypt.hashSync('', salt),
//       prof_pic_path: '',
//       prof_pic_name: '',
//       things: [thing._id]
//     });

//     user.save((err) => {
//       if (err) {
//         return err;
//       }
//     });
//   });
// });

Category.create(categories, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((categories) => {
    console.log(categories.title);
  });
  mongoose.connection.close();
});

// Thing.create(things, (err, docs) => {
//   if (err) {
//     throw err;
//   }

//   docs.forEach((things) => {
//     console.log(things.title);
//   });
//   mongoose.connection.close();
// });

User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((users) => {
    console.log(users.username);
  });
  mongoose.connection.close();
});
