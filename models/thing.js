const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thingSchema = new Schema({
  title: String,
  localitzation: { coordinates: [Number] },
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  ],
  price: Number
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
