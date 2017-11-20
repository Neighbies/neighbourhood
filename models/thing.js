const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thingSchema = new Schema({
  title: String,
  localitzation: { type: { type: String }, coordinates: [Number] },
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  ],
  pic_path: String,
  pic_name: String,
  price: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
