const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrderItem(data) {
  let errors = {};

  data.quantity = !isEmpty(data.quantity) ? data.quantity : '';

  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = 'Quantity field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
