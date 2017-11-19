const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: String,
  pic_path: String,
  pic_name: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
