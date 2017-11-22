const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thingSchema = new Schema({
  title: String,
  localitzation: String,
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  ],
  pic_path: String,
  pic_name: String,
  price: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

thingSchema.index({title: 'text', description: 'text'});

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
