const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SupplierSchema = new Schema({
  supName: {
    type: String,
    required: true
  },
  supFax: {
    type: String,
    required: true
  },
  supTown: {
    type: String,
    required: true
  }
});

module.exports = Supplier = mongoose.model('supplier', SupplierSchema);
