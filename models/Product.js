const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  prodName: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'supplier'
  }
});

module.exports = Product = mongoose.model('product', ProductSchema);
