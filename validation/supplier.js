const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCustomer(data) {
  let errors = {};

  data.supName = !isEmpty(data.supName) ? data.supName : '';
  data.supFax = !isEmpty(data.supFax) ? data.supFax : '';
  data.supTown = !isEmpty(data.supTown) ? data.supTown : '';

  if (Validator.isEmpty(data.supName)) {
    errors.supName = 'Supplier name field is required';
  }

  if (Validator.isEmpty(data.supFax)) {
    errors.supFax = 'Supplier fax field is required';
  }

  if (Validator.isEmpty(data.supTown)) {
    errors.supTown = 'Supplier town field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
