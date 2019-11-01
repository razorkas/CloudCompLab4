const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCustomer(data) {
  let errors = {};

  data.custName = !isEmpty(data.custName) ? data.custName : '';
  data.custFax = !isEmpty(data.custFax) ? data.custFax : '';
  data.custTown = !isEmpty(data.custTown) ? data.custTown : '';

  if (Validator.isEmpty(data.custName)) {
    errors.custName = 'Customer name field is required';
  }

  if (Validator.isEmpty(data.custFax)) {
    errors.custFax = 'Customer Fax field is required';
  }

  if (Validator.isEmpty(data.custTown)) {
    errors.custTown = 'Customer Town field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
