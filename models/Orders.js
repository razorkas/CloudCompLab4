const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrdersSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customer'
  },
  date: {
    type: Date,
    default: Date.now
  },
  paid: {
    type: Boolean,
    default: false
  },
  executed: {
    type: Boolean,
    default: false
  },
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'orderItem'
    }
  ]
});

module.exports = Orders = mongoose.model('orders', OrdersSchema);
