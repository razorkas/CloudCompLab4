const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrderItem(data) {
  let errors = {};

  data.prodName = !isEmpty(data.prodName) ? data.prodName : '';
  data.unit = !isEmpty(data.unit) ? data.unit : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.stock = !isEmpty(data.stock) ? data.stock : '';

  if (Validator.isEmpty(data.prodName)) {
    errors.prodName = 'Product name field is required';
  }

  if (Validator.isEmpty(data.unit)) {
    errors.unit = 'Unit field is required';
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price field is required';
  }

  if (Validator.isEmpty(data.stock)) {
    errors.stock = 'Stock field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
