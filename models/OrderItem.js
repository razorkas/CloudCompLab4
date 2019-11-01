const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = OrderItem = mongoose.model('orderItem', OrderItemSchema);
