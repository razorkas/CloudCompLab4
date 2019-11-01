const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
  custName: {
    type: String,
    required: true
  },
  custFax: {
    type: String,
    required: true
  },
  custTown: {
    type: String,
    required: true
  }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
