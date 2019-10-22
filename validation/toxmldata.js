const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateToXML(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.monthprice = !isEmpty(data.monthprice) ? data.monthprice : '';
  data.yearprice = !isEmpty(data.yearprice) ? data.yearprice : '';
  data.ssdcapacity = !isEmpty(data.ssdcapacity) ? data.ssdcapacity : '';
  data.sites = !isEmpty(data.sites) ? data.sites : '';
  data.mysqldbs = !isEmpty(data.mysqldbs) ? data.mysqldbs : '';
  data.ramlimit = !isEmpty(data.ramlimit) ? data.ramlimit : '';
  data.cpulimit = !isEmpty(data.cpulimit) ? data.cpulimit : '';
  data.freedomain = !isEmpty(data.freedomain) ? data.freedomain : '';
  data.freessl = !isEmpty(data.freessl) ? data.freessl : '';
  data.siteconstr = !isEmpty(data.siteconstr) ? data.siteconstr : '';
  data.scrinstall = !isEmpty(data.scrinstall) ? data.scrinstall : '';
  data.hostplace = !isEmpty(data.hostplace) ? data.hostplace : '';
  data.freetest = !isEmpty(data.freetest) ? data.freetest : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.monthprice)) {
    errors.monthprice = 'Month price field is required';
  }

  if (Validator.isEmpty(data.yearprice)) {
    errors.yearprice = 'Year price field is required';
  }

  if (Validator.isEmpty(data.ssdcapacity)) {
    errors.ssdcapacity = 'SSD Capacity field is required';
  }

  if (Validator.isEmpty(data.sites)) {
    errors.sites = 'Sites field is required';
  }

  if (Validator.isEmpty(data.mysqldbs)) {
    errors.mysqldbs = 'MySQL databases field is required';
  }

  if (Validator.isEmpty(data.ramlimit)) {
    errors.ramlimit = 'RAM limit field is required';
  }

  if (Validator.isEmpty(data.cpulimit)) {
    errors.cpulimit = 'CPU limit field is required';
  }

  if (Validator.isEmpty(data.freedomain)) {
    errors.freedomain = 'Free domain field is required';
  }

  if (Validator.isEmpty(data.freessl)) {
    errors.freessl = 'Free SSL field is required';
  }

  if (Validator.isEmpty(data.siteconstr)) {
    errors.siteconstr = 'Site constructor field is required';
  }

  if (Validator.isEmpty(data.scrinstall)) {
    errors.scrinstall = 'Script installation field is required';
  }

  if (Validator.isEmpty(data.hostplace)) {
    errors.hostplace = 'Host placement field is required';
  }

  if (Validator.isEmpty(data.freetest)) {
    errors.freetest = 'Free test period field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
